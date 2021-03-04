import { Layout, Modal, Spin, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Text } = Typography;

const AccessDenied = () => {
  const homeURL = `http://${process.env.REACT_APP_FRONTEND_HOME_URL}`;

  return (
    <Layout>
      <Modal
        centered
        width="600px"
        visible={true}
        closable={false}
        footer={null}
      >
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
            You do not have access to this resource.
          </Title>
          <Text>Redirecting you to home tenant.</Text>
          <Spin indicator={antIcon} style={{ margin: "20px" }} />
          <a href={homeURL}>Go to Home</a>
        </Layout>
      </Modal>
    </Layout>
  );
};

export default AccessDenied;
