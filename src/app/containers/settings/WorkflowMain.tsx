import { Button, Card } from "antd";
import Layout from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getTenantInfo } from "../../core/services/tenantinfo";

function WorkflowMain() {
  const tenant = getTenantInfo();

  const accessToken = localStorage.getItem("accessToken");

  const [workflowAlreadyAdded, setWorkflowAlreadyAdded] = useState(false);

  const [workflowId, setWorkflowId] = useState<null | number>(null);

  const getExistingWorkflows = () => {
    axios
      .get(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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

  const handleRedirect = () => (
    <Redirect to="/settings/workflow/modify"></Redirect>
  );
  useEffect(() => {
    getExistingWorkflows();
  }, []);

  if (workflowAlreadyAdded) {
    return (
      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card style={{ padding: "20px", borderRadius: "10px" }}>
          <Title level={3}>
            Workflow is already added. Do you want to modify the workflow?
          </Title>
          {/* <Link to="/settings/workflow/modif"> */}
          <Button type="primary" onClick={() => handleRedirect()}>
            Modify Workflow
          </Button>
          {/* </Link> */}
        </Card>
      </Layout>
    );
  }
  return <Layout></Layout>;
}

export default WorkflowMain;
