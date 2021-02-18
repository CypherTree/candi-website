import React from "react";

import { Layout } from "antd";
import Title from "antd/lib/typography/Title";

const PageNotFound = () => {
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Title level={3}>
        404: Page you requested was not found on this server.
      </Title>
    </Layout>
  );
};

export default PageNotFound;
