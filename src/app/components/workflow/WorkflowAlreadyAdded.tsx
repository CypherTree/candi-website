import React from "react";

import { Button, Layout } from "antd";
import Title from "antd/lib/typography/Title";

const WorkflowAlreadyAdded = (props: any) => {
  const { handleCancelModal } = props;
  return (
    <>
      <Layout
        style={{
          textAlign: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
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
      </Layout>
      <Layout style={{ backgroundColor: "#fff" }}>
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
      </Layout>
    </>
  );
};

export default WorkflowAlreadyAdded;
