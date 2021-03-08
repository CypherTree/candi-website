import { Button, Col, Divider, Form, Input, Row } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import EditWorkflowSteps from "./EditWorkflowSteps";

const WorkflowEditForm = (props: any) => {
  const { workflowData } = props;

  console.log("Workflow Data ----", workflowData);

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const tenant = "cyphertree";

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const rowStyle = { width: 500, display: "flex", flexDirection: "row" };

  const colStyle = { width: 250 };

  const onOk = async () => {
    updateWorkflowDetails({ name });
  };

  const updateWorkflowDetails = (values: any) => {
    console.log("value ---->", values);

    setLoading(true);
    axios
      .put(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/${workflowData.id}/`,
        values,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);

        toast.success("Company was updated successfully.");
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);
        toast.error("Some error occoured");
      });
  };

  //   useEffect(() => {
  //     if (workflowData.name) {
  //       setName(workflowData.name);
  //     }
  //   }, []);

  useEffect(() => {
    setName(workflowData.name);
  });

  return (
    <>
      <Form
        name="add-a-new-client"
        // onFinish={onFinish}
        layout="horizontal"
        style={{ width: "1000px", display: "flex", flexDirection: "row" }}
      >
        <Form.Item
          label="Workflow name: "
          rules={[{ required: true }]}
          style={{ marginRight: "20px" }}
        >
          <Input
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => onOk()}>
            Update Name
          </Button>
        </Form.Item>
      </Form>

      <Divider />
      <EditWorkflowSteps workflowData={workflowData} />
    </>
  );
};

export default WorkflowEditForm;
