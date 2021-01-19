import React from "react";

import { Button } from "antd";
import Title from "antd/lib/typography/Title";

const WorkflowAlreadyAdded = (props: any) => {
  const { handleCancelModal } = props;
  return (
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
  );
};

export default WorkflowAlreadyAdded;
