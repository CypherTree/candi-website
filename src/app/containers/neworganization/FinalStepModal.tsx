import React from "react";

import { Button, Layout, Typography } from "antd";

const { Text } = Typography;

const FinalStepModal = (props: any) => {
  const { handleCancelModal } = props;

  return (
    <>
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "400px",
          backgroundColor: "white",
        }}
      >
        <Text>You have successully created/updated the organisation.</Text>
        <Text>You may now click Cancel or Finish to exit wizard.</Text>
      </Layout>
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",

          backgroundColor: "white",
        }}
      >
        <Button type="primary" onClick={handleCancelModal}>
          Finish
        </Button>
      </Layout>
    </>
  );
};

export default FinalStepModal;
