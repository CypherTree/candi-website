import { Button, Layout, Modal, Spin, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Text } = Typography;
function TrialExpired() {
  return (
    <Modal centered width="600px" visible={true} closable={false} footer={null}>
      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Title type="danger" level={3}>
          Your trial plan has expired.
        </Title>
        <Text>Kindly upgrade your plan to continue.</Text>
        <Button type="primary" style={{ margin: "20px" }}>
          Upgrade Now
        </Button>
      </Layout>
    </Modal>
  );
}

export default TrialExpired;
