import { Button, Col, Divider, Form, Input, Row } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import AntSpinner from "../../components/spinner/AntSpinner";
import { getTenantInfo } from "../../core/services/tenantinfo";
import EditWorkflowSteps from "./EditWorkflowSteps";

const WorkflowEditForm = (props: any) => {
  // const { workflowData } = props;

  // console.log("Workflow Data ----", workflowData);

  let { workflowId } = useParams();

  const [workflowName, setWorkflowName] = useState("");
  const [description, setDescription] = useState("");

  const [workflowData, setWorkflowData] = useState<any>();

  const [loading, setLoading] = useState(false);

  const tenant = getTenantInfo();

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const rowStyle = { width: 500, display: "flex", flexDirection: "row" };

  const colStyle = { width: 250 };

  const onOk = async () => {
    updateWorkflowDetails({ name: workflowName, description });
  };

  const getWorkflowDetails = () => {
    axios
      .get(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/${workflowId}`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setWorkflowData(response.data.data);
        setWorkflowName(response.data.data.name);
        setDescription(response.data.data.description);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);

        toast.error("Some error occoured");
      });
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

  useEffect(() => {
    getWorkflowDetails();
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  if (loading) {
    return <AntSpinner></AntSpinner>;
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24}>
          <Form
            name="add-a-new-client"
            // onFinish={onFinish}
            // {...layout}
            style={{
              maxWidth: "1200px",
              // backgroundColor: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // textAlign: "center",
              alignItems: "center",
            }}
          >
            <Form.Item
              label="Workflow name: "
              rules={[{ required: true }]}
              style={{ marginRight: "20px" }}
            >
              <Input
                value={workflowName}
                onChange={(e: any) => setWorkflowName(e.target.value)}
                style={{ width: "300px" }}
                maxLength={50}
              />
            </Form.Item>

            <Form.Item
              label="Description: "
              rules={[{ required: true }]}
              style={{ marginRight: "20px" }}
            >
              <Input.TextArea
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                style={{ width: "300px" }}
                maxLength={200}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={() => onOk()}>
                Update
              </Button>
            </Form.Item>
            <Divider />
            <EditWorkflowSteps workflowData={workflowData} />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default WorkflowEditForm;
