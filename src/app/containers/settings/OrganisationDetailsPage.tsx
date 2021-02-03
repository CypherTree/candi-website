import { Button, Form, Input, Layout } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState, useEffect } from "react";

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

  return (
    <Layout>
      {/* <Title level={2} style={{ padding: "10px" }}>
        {" "}
        Organisation Details Page
      </Title> */}
      <Form
        name="basic"
        // initialValues={{
        //   organisationName: props.state.app.currentOrganization.name
        //     ? props.state.app.currentOrganization.name
        //     : currentOrganization.name,
        //   organisationWebsite: props.state.app.currentOrganization.website
        //     ? props.state.app.currentOrganization.website
        //     : currentOrganization.website,
        //   domain: props.state.app.currentOrganization.slug
        //     ? props.state.app.currentOrganization.slug
        //     : currentOrganization.domain,
        // }}
        // onFinish={onFinish}
        layout="vertical"
        // style={{ paddingTop: "30px" }}
      >
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
              // height: "400px",
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
              // extra="Organsation Name"
              // name="organisationName"
            >
              <Input
                // onChange={(e) => setOrganisationName(e.target.value)}
                disabled={isSubmitted}
                placeholder="Organisation Name"
                value={orgName}
              />
            </Form.Item>

            <Form.Item
              // name="organisationWebsite"
              rules={[
                { required: true, message: "Please input your Website!" },
              ]}
              label=" Website:"
              // extra="example: google.com"
            >
              <Input
                // onChange={(e) => setOrganisationWebsite(e.target.value)}
                disabled={isSubmitted}
                placeholder="Website"
                value={orgWebsite}
                // value={organisationWebsite}
              />
            </Form.Item>

            <Form.Item
              // name="domain"
              rules={[{ required: true, message: "Please input your domain!" }]}
              label=" Domain:"
            >
              <Input
                // onChange={(e) => setDomain(e.target.value)}
                disabled={isSubmitted}
                placeholder="Domain"
                value={orgDomain}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Title level={5}>
                {/* {domain === "" ? "your-domain" : domain}.theonboarders.com */}
              </Title>
            </Form.Item>

            {/* <Form.Item>
              {domain !== "" &&
              props.state.app.domainCheckMessage !== "Domain already taken" ? (
                <Text>
                  This domain is available.{" "}
                  <CheckCircleFilled
                    style={{ color: "green", fontSize: "20px" }}
                  />
                </Text>
              ) : (
                <Text>
                  This domain is NOT available.{" "}
                  <CloseCircleFilled
                    style={{ color: "red", fontSize: "20px" }}
                  />
                </Text>
              )}
            </Form.Item> */}
          </div>
        </Layout>
      </Form>
    </Layout>
  );
};

export default OrganisationDetailsPage;
