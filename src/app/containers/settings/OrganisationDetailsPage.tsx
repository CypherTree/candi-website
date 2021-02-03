import React, { useState, useEffect } from "react";

import { Form, Input, Layout } from "antd";
import Title from "antd/lib/typography/Title";

import AntSpinner from "../../components/spinner/AntSpinner";

import { getTenantInfo } from "../../core/services/tenantinfo";

const OrganisationDetailsPage = () => {
  const [loading, setLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(true);

  const [orgName, setOrgName] = useState("thor");

  const [orgWebsite, setOrgWebsite] = useState("thor.com");

  const [orgDomain, setOrgDomain] = useState("thor.candi.local");

  useEffect(() => {
    const ten = getTenantInfo();

    console.log("tenant -->", ten);
  }, []);

  if (loading) {
    return <AntSpinner />;
  } else {
    return (
      <Layout>
        <Form name="basic" layout="vertical">
          <Layout
            style={{
              padding: "30px 30px 30px 30px",
              margin: "30px",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                lineHeight: "40px",
                width: "800px",
                padding: "100px",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <Title
                level={4}
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  textAlign: "center",
                  paddingBottom: "20px",
                }}
              >
                Organisation Details
              </Title>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your Organisation Name!",
                  },
                ]}
                style={{ justifyContent: "left" }}
                label=" Name:"
              >
                <Input
                  disabled={isSubmitted}
                  placeholder="Organisation Name"
                  value={orgName}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  { required: true, message: "Please input your Website!" },
                ]}
                label=" Website:"
              >
                <Input
                  disabled={isSubmitted}
                  placeholder="Website"
                  value={orgWebsite}
                />
              </Form.Item>

              <Form.Item
                rules={[
                  { required: true, message: "Please input your domain!" },
                ]}
                label=" Domain:"
              >
                <Input
                  disabled={isSubmitted}
                  placeholder="Domain"
                  value={orgDomain}
                />
              </Form.Item>
            </div>
          </Layout>
        </Form>
      </Layout>
    );
  }
};
export default OrganisationDetailsPage;
