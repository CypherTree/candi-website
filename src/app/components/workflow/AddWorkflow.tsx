import React, { useEffect, useState } from "react";

import { Button, Form, Row, Col, Input, Select, Layout } from "antd";
import Title from "antd/lib/typography/Title";
import { DeleteFilled } from "@ant-design/icons";

import Axios from "axios";

import { connect } from "react-redux";

import AddCustomWorkflow from "./AddCustomWorkflow";

const { Option } = Select;

const AddWorkflow = (props: any) => {
  const org_id = props.state.app.currentOrganization.id;

  const accessToken = localStorage.getItem("accessToken");

  const { handleNext, handleBack, handleCancelModal } = props;

  const [workflowAlreadyAdded, setWorkflowAlreadyAdded] = useState(false);

  // const []
  //   `${process.env.REACT_APP_SERVER_URL}/api/v1/workflow/`
  const tenant = "cyphertree";

  // const tenant = "thor";
  // const tenant = "tikona";

  const getExistingWorkflows = () => {
    Axios.get(`http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("workflow data from API --> ", response.data);
        if (response.data.data.length !== 0) {
          setWorkflowAlreadyAdded(true);
          console.log("workflow data 1 ---->", response.data.data);
          console.log("workflow data 2 ---->", response.data.data[0]);
          console.log("workflow data 3 ---->", response.data.data[0].id);

          setWorkflowId(response.data.data[0].id);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const [workflowId, setWorkflowId] = useState<null | number>(null);

  const createWorkflow = () => {
    Axios.post(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/`,
      {
        name: workflowName,
        client_company: null,
        for_organization: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setWorkflowId(response.data.data.id);
      })
      .then(() => {
        setSelectionDone(true);
        // handleNext();
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getExistingWorkflows();
  }, []);

  const [organisationType, setOrganisationType] = React.useState(1);

  const [workflowType, setWorkflowType] = React.useState(1);

  const [open, setOpen] = useState(false);

  const [selectionDone, setSelectionDone] = useState(false);

  const [workflowName, setWorkflowName] = useState("");

  const handleWorkflowTypeChange = (value: any) => {
    setWorkflowType(value);
  };

  const handleOrganisationTypeChange = (value: any) => {
    setOrganisationType(value);
  };

  const handleSkip = () => {
    updateOrganisation(2);
    handleCancelModal();
  };

  const isDeleteAllowed = true;

  const handleSubmitForm = () => {
    createWorkflow();
    updateOrganisation(1);

    console.log("workflow type ", workflowType);

    if (workflowType !== 2) {
      handleNext();
    }
  };

  const updateOrganisation = (value: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const data = props.state.app.currentOrganization;

    data.workflow_added = value;

    const jwtToken = `Bearer ${accessToken}`;

    Axios.put(
      `http://id.thetobbers-staging.ml:8000/api/v1/organization/${org_id}/`,
      data,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => console.log("data", response.data))

      .catch((e) => console.log("err", e));
  };

  return (
    <>
      {!workflowAlreadyAdded ? (
        <div style={{ textAlign: "center" }}>
          <Title
            level={4}
            style={{
              fontWeight: "bold",
              width: "auto",
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Workflow is already added.
          </Title>
          <p> You can edit workflow steps in tenent settings.</p>

          <span
            style={{
              paddingRight: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          >
            <Button type="primary" onClick={() => handleCancelModal()}>
              Finish
            </Button>
          </span>
        </div>
      ) : (
        <div>
          {selectionDone ? (
            <>
              <AddCustomWorkflow
                workflowId={workflowId}
                handleCancelModal={handleCancelModal}
              />
            </>
          ) : (
            <Layout
              style={{
                backgroundColor: "#fff",
                // alignItems: "center",
                width: "850px",
                paddingLeft: "150px",
              }}
            >
              <div style={{ height: "400px" }}>
                <Title
                  level={4}
                  style={{
                    fontWeight: "bold",
                    width: "auto",
                    margin: "10px 40px 15px 20px ",
                    // padding: "0px 0px 0px 200px",
                    textAlign: "center",
                  }}
                >
                  Add Workflow
                </Title>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  // onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item>
                        <Select
                          // defaultValue={type ? type : ""}
                          style={{ width: "300px" }}
                          onChange={handleOrganisationTypeChange}
                          placeholder="Select Organisation"
                          disabled={!isDeleteAllowed}
                        >
                          <Option value="1">
                            <div
                              style={{
                                wordWrap: "break-word",
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "helvetica",
                                }}
                              >
                                {" "}
                                Default Cyphertree
                              </p>

                              <p
                                style={{
                                  wordWrap: "break-word",
                                  fontSize: "14px",
                                  whiteSpace: "initial",
                                }}
                              >
                                random lorem
                              </p>
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Select
                          // defaultValue={type ? type : ""}
                          style={{ width: "300px" }}
                          onChange={handleWorkflowTypeChange}
                          placeholder="Add Workflow"
                          disabled={!isDeleteAllowed}
                        >
                          <Option value="1">
                            <div
                              style={{
                                wordWrap: "break-word",
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "helvetica",
                                }}
                              >
                                {" "}
                                Choose Default Recruitment Template
                              </p>

                              <p
                                style={{
                                  wordWrap: "break-word",
                                  fontSize: "14px",
                                  whiteSpace: "initial",
                                }}
                              >
                                This template consists of screening, interview,
                                basic recruitment flow.
                              </p>
                            </div>
                          </Option>
                          <Option value="2">
                            <div>
                              {" "}
                              <b> Add custom workflow</b>
                            </div>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please input Workflow Name!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Workflow Name"
                          value={workflowName}
                          onChange={(e) => setWorkflowName(e.target.value)}
                          disabled={!isDeleteAllowed}
                          required
                          style={{ width: "300px" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div
                style={{
                  paddingTop: "30px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <span style={{ paddingRight: "10px" }}>
                  <Button onClick={() => handleBack()}>Back</Button>{" "}
                </span>

                <span style={{ paddingRight: "10px" }}>
                  <Button type="primary" onClick={handleSubmitForm}>
                    Save and Next
                  </Button>
                </span>

                <span style={{ paddingRight: "10px" }}>
                  <Button onClick={handleSkip}>Skip</Button>
                </span>
              </div>
            </Layout>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(AddWorkflow);
