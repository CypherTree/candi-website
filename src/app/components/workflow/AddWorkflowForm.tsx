import React from "react";

import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
} from "antd";
import Title from "antd/lib/typography/Title";

const { Option } = Select;

const { Text } = Typography;

const AddWorkflowForm = (props: any) => {
  const {
    workflowType,
    handleWorkflowTypeChange,
    workflowName,
    setWorkflowName,
    organisationType,
    handleOrganisationTypeChange,
    isDeleteAllowed,
    currentError,
    handleSkip,
    handleSubmitForm,
    handleBack,
  } = props;
  return (
    <Layout
      style={{
        backgroundColor: "#fff",
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
            textAlign: "center",
          }}
        >
          Add Workflow
        </Title>
        <Form name="basic" initialValues={{ remember: true }}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item>
                <Select
                  style={{ width: "300px" }}
                  onChange={handleOrganisationTypeChange}
                  placeholder="Select Organisation"
                  disabled={!isDeleteAllowed}
                  value={organisationType}
                >
                  <Option value="Default workflow">
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
                        Default Cyphertree
                      </p>

                      {/* <p
                                style={{
                                  wordWrap: "break-word",
                                  fontSize: "14px",
                                  whiteSpace: "initial",
                                }}
                              >
                                random lorem
                              </p> */}
                    </div>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Select
                  style={{ width: "300px" }}
                  onChange={handleWorkflowTypeChange}
                  placeholder="Add Workflow"
                  disabled={!isDeleteAllowed}
                  value={workflowType}
                >
                  <Option value="Custom workflow">
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
                        Choose Default Recruitment Template
                      </p>

                      <p
                        style={{
                          wordWrap: "break-word",
                          fontSize: "14px",
                          whiteSpace: "initial",
                        }}
                      >
                        This template consists of screening, interview, basic
                        recruitment flow.
                      </p>
                    </div>
                  </Option>
                  <Option value="2">
                    <div>
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
          {currentError && <Text type="danger">{currentError}</Text>}
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
  );
};

export default AddWorkflowForm;
