import { Form, Input, Layout, Modal, Select, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

import { getTenantInfo } from "../../core/services/tenantinfo";

const { Option } = Select;

const WorkflowModal = (props: any) => {
  const tenant = getTenantInfo();

  const {
    setShowModal,
    setShouldReload,
    workflowTypesList,
    clientList,
  } = props;

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientCompany, setClientCompany] = useState<any>();
  const [forOrganization, setForOrganization] = useState();
  const [workflowType, setWorkflowType] = useState<any>();

  const [isCreated, setIsCreated] = useState(false);

  const clearAllFields = () => {
    setName("");
    setDescription("");
  };

  const onOk = () => {
    if (isCreated) {
      setShowModal(false);
      clearAllFields();
    } else {
      const sendObject = {
        name,
        description,
        for_organization: forOrganization,
        client_company: clientCompany ? clientCompany.value : "",
        workflow_type: workflowType.value,
      };
      addANewWorkflow(sendObject);
    }
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const handleForOrganizationChange = (e: any) => {
    setForOrganization(e);
  };

  const handleClientCompanyChange = (e: any) => {
    console.log("---value of client company ----", e);
    setClientCompany(e);
    console.log("---value of set client company ----", clientCompany);
  };

  const handleWorkflowTypeChange = (e: any) => {
    console.log("---value of workflow type ----", e);
    setWorkflowType(e);
    console.log("---value of set workflow type ----", workflowType);
  };

  const onFinish = () => {};

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const addANewWorkflow = (values: any) => {
    console.log("value ---->", values);
    setLoading(true);
    axios
      .post(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/`,
        values,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setIsCreated(true);
        toast.success("Workflow was created successfully.");
        setShowModal(false);
      })
      .then(() => setShouldReload(true))
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);
        toast.error("Some error occoured");
      });
  };

  useEffect(() => {}, []);

  if (loading) {
    return (
      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          height: "auto",
        }}
      >
        <Spin />
      </Layout>
    );
  }
  return (
    <Modal
      title="Add a new client"
      centered
      visible={true}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      width={500}
    >
      {isCreated ? (
        <Layout
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: "auto",
          }}
        >
          <Title level={5} type="success">
            Workflow was created successfully.
          </Title>
        </Layout>
      ) : (
        <Form name="add-a-new-workflow" onFinish={onFinish} layout="vertical">
          <Form.Item
            label={name === "" ? "" : "Name of the Workflow: "}
            rules={[{ required: true }]}
          >
            <Input
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="Name of the Workflow"
              maxLength={50}
            />
          </Form.Item>
          <Form.Item
            label={description === "" ? "" : "Description: "}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              maxLength={200}
              placeholder="Description:"
            />
          </Form.Item>

          <Form.Item
            label={forOrganization ? "For Self Organization: " : ""}
            rules={[{ required: true }]}
          >
            <Select
              // style={styles}
              placeholder="Is workflow for self?"
              value={forOrganization}
              onChange={handleForOrganizationChange}
            >
              <Option value={1} key={1}>
                Yes
              </Option>
              <Option value={0} key={0}>
                No
              </Option>
            </Select>
          </Form.Item>

          {forOrganization === 0 && (
            <Form.Item
              label={clientCompany ? "Select client company: " : ""}
              rules={[{ required: true }]}
            >
              <Select
                // style={styles}
                labelInValue
                placeholder="Client Company"
                value={clientCompany}
                onChange={(e) => handleClientCompanyChange(e)}
              >
                {clientList &&
                  clientList.length > 0 &&
                  clientList.map((client: any) => (
                    <Option value={client.id} key={client.id}>
                      {client.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label={workflowType ? "Select workflow type: " : ""}
            rules={[{ required: true }]}
          >
            <Select
              // style={styles}
              labelInValue
              placeholder="Workflow Type"
              value={workflowType}
              onChange={handleWorkflowTypeChange}
            >
              {workflowTypesList &&
                workflowTypesList.length > 0 &&
                workflowTypesList.map((client: any) => (
                  <Option value={client.id} key={client.id}>
                    {client.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default WorkflowModal;
