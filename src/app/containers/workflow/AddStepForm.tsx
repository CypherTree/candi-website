import React, { useState, useEffect } from "react";

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
} from "antd";
import Title from "antd/lib/typography/Title";

import Axios from "axios";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getTenantInfo } from "../../core/services/tenantinfo";

const { Text } = Typography;

const { Option } = Select;

const AddStepForm = (props: any) => {
  const isDeleteAllowed = true;

  const [checkVideoEnabled, setCheckVideoEnabled] = useState(true);

  const [stepName, setStepName] = useState("");
  const [stepDescription, setStepDescription] = useState("");

  const [formTypeValue, setFormTypeValue] = useState("Default form");

  const [currentError, setCurrentError] = useState("");

  const [categoryList, setCategoryList] = useState<undefined | any>();

  type Category = {
    value: number;
  };

  const [category, setCategory] = useState<Category | any>();

  const {
    setIsAddStepFormOpen,
    steps,
    setDataReload,
    selectedStep,
    workflowId,
    typeId,
  } = props;

  console.log("props in steps -->", props);

  const [editMode, setEditMode] = useState(false);

  const handleFormTypeValueChange = (value: any) => {
    setFormTypeValue(value);
  };

  const handleStepCategoryChange = (value: any) => {
    console.log("--- new category", value);
    setCurrentError("");
    setCategory(value);
  };

  const tenant = getTenantInfo();

  const handleFormSubmit = () => {
    if (stepName === "") {
      setCurrentError("Step must have a name");
    } else if (!category) {
      setCurrentError("Add step category");
    } else {
      if (editMode) {
        const data = {
          name: stepName,
          description: stepDescription,
          video_enabled: checkVideoEnabled,
          category: category ? category.value : 0,
        };

        console.log("data submitted for step update----->", data);

        updateStepsApi(data);
      } else {
        const data = {
          name: stepName,
          description: stepDescription,
          category: category ? category.value : 0,
          video_enabled: checkVideoEnabled,
          workflow: workflowId,
          order: steps.length,
        };

        createStepApi(data);
      }
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  const getStepCategories = () => {
    console.log("---- get step categories was called ---");
    Axios.get(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/types/${typeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(
          " data from add step API --> ",
          response.data.data.categories
        );
        setCategoryList(response.data.data.categories);
      })
      .catch((err) => {
        console.log("err ", err);
        toast.error("Could not get step categories.");
      });
  };

  const createStepApi = (data: any) => {
    Axios.post(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/step/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(" data from add step API --> ", response.data);
        toast.success("Step added successfully.");
      })
      .catch((err) => {
        console.log("err ", err);
        toast.error("Steps could not be created.");
      });

    setIsAddStepFormOpen(false);

    setDataReload(true);
  };

  const updateStepsApi = (data: any) => {
    Axios.put(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/step/${selectedStep.id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(" data from add step API --> ", response.data);
        toast.success("steps update successful");
      })
      .catch((err) => {
        console.log("err ", err);
        toast.error("Steps could not be updated.");
      });

    setIsAddStepFormOpen(false);

    setDataReload(true);
  };

  useEffect(() => {
    getStepCategories();
    if (selectedStep && selectedStep.category && selectedStep.category.id) {
      setCategory({
        key: selectedStep.category.id,
        value: selectedStep.category.id,
        name: selectedStep.category.id,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedStep !== null) {
      console.log("<------ COOL UNTIL HERE ------->", selectedStep);

      setEditMode(true);

      setStepDescription(selectedStep.description);
      setStepName(selectedStep.name);
      setCheckVideoEnabled(selectedStep.video_enabled);

      if (selectedStep.step_type === 1) {
        setFormTypeValue("Default form");
      } else {
        setFormTypeValue("No form");
      }
    }

    if (selectedStep === null) {
      setEditMode(false);

      setStepDescription("");
      setStepName("");
      setCheckVideoEnabled(true);
    }
  }, [selectedStep]);

  return (
    <div
      style={{
        border: "1px solid #c1c1c1",
        borderRadius: 10,
        justifyContent: "center",
        padding: "20px",
        // width: "600px",
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "red",
        backgroundColor: "whitesmoke",
      }}
    >
      <Title level={5} style={{ textAlign: "center", paddingBottom: "10px" }}>
        Add/Edit Step
      </Title>

      <Form name="basic" initialValues={{ remember: true }}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
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
        <Row gutter={8}>
          <Col span={12}>
            <Select
              style={{ width: "250px" }}
              placeholder="Form Type"
              disabled={!isDeleteAllowed}
              value={formTypeValue}
              onChange={handleFormTypeValueChange}
            >
              <Option value="Default form">
                <div> Default Form</div>
              </Option>
              <Option value="No form">
                <div> No Form</div>
              </Option>
            </Select>
          </Col>
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

        <Row gutter={8} style={{ paddingTop: "10px" }}>
          <Col span={12}>
            <Form.Item
              label={category ? "Select step category: " : ""}
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "250px" }}
                labelInValue
                placeholder="Step Category"
                value={category}
                onChange={(e) => handleStepCategoryChange(e)}
              >
                {categoryList &&
                  categoryList.length > 0 &&
                  categoryList.map((category: any) => (
                    <Option value={category.id} key={category.id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* <Row gutter={8} style={{ marginTop: "10px" }}>
          <Col span={12}>
            <Form.Item
              label={category ? "Select step category: " : ""}
              rules={[{ required: true }]}
            >
              <Select
                // style={styles}
                labelInValue
                placeholder="Step Category"
                value={category}
                onChange={(e) => handleStepCategoryChange(e)}
              >
                {categoryList &&
                  categoryList.length > 0 &&
                  categoryList.map((category: any) => (
                    <Option value={category.id} key={category.id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row> */}

        {currentError && <Text type="danger">{currentError}</Text>}

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
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(AddStepForm);
