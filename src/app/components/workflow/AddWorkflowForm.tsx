import React, { useState } from "react";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
} from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import { getTenantInfo } from "../../core/services/tenantinfo";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    workflowTypesList,
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
                        For Self Organisation
                      </p>
                    </div>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Select
                  labelInValue
                  style={{ width: "300px" }}
                  onChange={handleWorkflowTypeChange}
                  placeholder="Workflow Type"
                  disabled={!isDeleteAllowed}
                  value={workflowType}
                >
                  {workflowTypesList &&
                    workflowTypesList.length > 0 &&
                    workflowTypesList.map((type: any) => (
                      <Option value={type.id} key={type.id}>
                        {type.name}
                      </Option>
                    ))}
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
        <Card style={{ textAlign: "center" }}>
          <p>You may add/modify your workflow in your organisation. </p>
          <p>
            To go to Organisation workflow <Link to="$">Click here</Link>{" "}
          </p>
        </Card>
        ,
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
