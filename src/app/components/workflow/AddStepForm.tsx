import React, { useState, useEffect } from "react";

import { Button, Checkbox, Col, Form, Input, Layout, Row, Select } from "antd";

import Axios from "axios";
import Title from "antd/lib/typography/Title";

const { Option } = Select;

const AddStepForm = (props: any) => {
  const isDeleteAllowed = true;

  const [checkVideoEnabled, setCheckVideoEnabled] = useState(true);

  const [stepName, setStepName] = useState("");

  const [stepDescription, setStepDescription] = useState("");

  const {
    open,
    setOpen,
    setIsAddStepFormOpen,
    steps,
    setDataReload,
    selectedStep,
    workflowId,
  } = props;

  const [formType, setFormType] = useState(1);

  const [categoryType, setCategoryType] = useState(1);

  const [editMode, setEditMode] = useState(false);

  const handleFormTypeChange = (value: any) => {
    setFormType(value);
  };

  const handleCategoryTypeChange = (value: any) => {
    setCategoryType(value);
  };

  const tenant = "cyphertree";
  // const tenant = "thor";
  // const workflow_id = 2;

  const handleFormSubmit = () => {
    if (editMode) {
      const data = {
        name: stepName,
        description: stepDescription,
        video_enabled: checkVideoEnabled,
      };

      console.log("data submitted for step update----->", data);

      updateStepsApi(data);
    } else {
      const data = {
        name: stepName,
        description: stepDescription,
        category: categoryType,
        video_enabled: checkVideoEnabled,
        workflow: workflowId,
        order: steps.length,
      };

      console.log("data submitted----->", data);

      createStepApi(data);
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  const createStepApi = (data: any) => {
    Axios.post(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/step/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(" data from add step API --> ", response.data);
      })
      .catch((err) => {
        console.log("err ", err);
      });

    setIsAddStepFormOpen(false);

    setDataReload(true);
  };

  const updateStepsApi = (data: any) => {
    Axios.put(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/step/${selectedStep.id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(" data from add step API --> ", response.data);
      })
      .catch((err) => {
        console.log("err ", err);
      });

    setIsAddStepFormOpen(false);

    setDataReload(true);
  };

  useEffect(() => {
    if (selectedStep !== null) {
      console.log("<------ COOL UNTIL HERE ------->", selectedStep);

      setEditMode(true);

      setStepDescription(selectedStep.description);
      setStepName(selectedStep.name);
      setFormType(selectedStep.step_type);
      setCheckVideoEnabled(selectedStep.video_enabled);
    }

    if (selectedStep === null) {
      setEditMode(false);

      setStepDescription("");
      setStepName("");
      setFormType(1);
      setCheckVideoEnabled(true);
    }
  }, [selectedStep]);

  return (
    <Layout
      style={{
        border: "1px solid #c1c1c1",
        borderRadius: 10,
        justifyContent: "center",
        padding: "20px",
        // textAlign: "center",
        // alignItems: "center",
        width: "600px",
      }}
    >
      <Title level={5} style={{ textAlign: "center", paddingBottom: "10px" }}>
        {" "}
        Add/Edit Step
      </Title>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              // name="gstNumber"
              rules={[
                {
                  required: true,
                  message: "Please input Role name!",
                },
              ]}
            >
              <Input
                placeholder="Step Name"
                value={stepName}
                onChange={(e) => setStepName(e.target.value)}
                style={{ width: "250px" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              // name="gstNumber"
              rules={[
                {
                  required: true,
                  message: "Please input Role name!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Step Description"
                value={stepDescription}
                onChange={(e) => setStepDescription(e.target.value)}
                style={{ width: "250px" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Select
              style={{ width: "250px" }}
              placeholder="Select Organisation"
              disabled={!isDeleteAllowed}
              value={formType}
              onChange={handleFormTypeChange}
              // defaultValue={type ? type : ""}
              // onClose={() => setOpen(false)}
            >
              <Option value="1">
                <div> Default Form</div>
              </Option>
              <Option value="2">
                <div> No Form</div>
              </Option>
            </Select>
          </Col>
          <Col span={12}>
            <Select
              style={{ width: "250px" }}
              placeholder="Select Organisation"
              disabled={!isDeleteAllowed}
              value={categoryType}
              onChange={handleCategoryTypeChange}
              // defaultValue={type ? type : ""}
              // onOpen={() => setOpen(true)}
              // onClose={() => setOpen(false)}
            >
              <Option value="In-Progress">
                <div
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                    {" "}
                    In Progress
                  </p>

                  <p
                    style={{
                      wordWrap: "break-word",
                      fontSize: "14px",
                      whiteSpace: "initial",
                    }}
                  >
                    This means that candidate selection is still in progress
                  </p>
                </div>
              </Option>
              <Option value="Interview">
                <div
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                    Interview
                  </p>

                  <p
                    style={{
                      wordWrap: "break-word",
                      fontSize: "14px",
                      whiteSpace: "initial",
                    }}
                  >
                    This option is selected when interview is in progress.
                  </p>
                </div>
              </Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: "10px" }}>
          <Col span={12}>
            <Checkbox
              name="checkedC"
              checked={checkVideoEnabled}
              onChange={() => {
                setCheckVideoEnabled(!checkVideoEnabled);
              }}
            >
              Video Enabled
            </Checkbox>
          </Col>
        </Row>

        <div
          style={{
            paddingTop: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span style={{ paddingRight: "10px" }}>
            <Button type="primary" onClick={handleFormSubmit}>
              {editMode ? "Update Step" : "Add Step"}
            </Button>
          </span>

          <span style={{ paddingRight: "10px" }}>
            <Button onClick={() => setIsAddStepFormOpen(false)}>Cancel</Button>
          </span>
        </div>
      </Form>
    </Layout>
  );
};

export default AddStepForm;
