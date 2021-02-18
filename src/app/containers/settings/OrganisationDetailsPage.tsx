import React, { useState, useEffect } from "react";

import { Form, Input, Layout } from "antd";
import Title from "antd/lib/typography/Title";

import AntSpinner from "../../components/spinner/AntSpinner";

import {
  getOrgIdFromTenantName,
  getTenantInfo,
} from "../../core/services/tenantinfo";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import axios from "axios";
import { toast } from "react-toastify";

const OrganisationDetailsPage = () => {
  const [loading, setLoading] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(true);

  const [orgName, setOrgName] = useState();

  const [orgWebsite, setOrgWebsite] = useState();

  const [orgDomain, setOrgDomain] = useState();

  // const organisation_id = getOrgIdFromTenantName();

  const organisation_id = 55;

  useEffect(() => {
    const ten = getTenantInfo();

    console.log("tenant -->", ten);

    getOrganisationData();
  }, []);

  const getOrganisationData = async () => {
    const { accessToken } = getCurrentSessionTokens();

    const jwtToken = `Bearer ${accessToken}`;

    toast.success(`ID recieved id  ${organisation_id}`);

    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/${organisation_id}/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("Current plan details from api ----->", response.data);
        setLoading(false);
        setOrgName(response.data.data.name);
        setOrgWebsite(response.data.data.website);
        setOrgDomain(response.data.data.slug);
        // setIsSubmitted(true);
      })
      .catch((err: any) => {
        // setLoading(false);
        console.log("err--->", err.response);
        toast.error("Some error occoured.");
      });
  };

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
