import React, { useState, useEffect } from "react";

import { Col, Form, Input, Layout, Row } from "antd";
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

  useEffect(() => {
    const ten = getTenantInfo();

    console.log("tenant -->", ten);

    getOrganisationData();
  }, []);

  const getOrganisationData = async () => {
    const { accessToken } = getCurrentSessionTokens();

    const jwtToken = `Bearer ${accessToken}`;

    const organizationId = await getOrgIdFromTenantName();

    toast.success(`ID recieved id  ${organizationId}`);

    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/${organizationId}/`,
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
      <Layout
        style={
          {
            // padding: "30px 30px 30px 30px",
            // margin: "30px",
            // backgroundColor: "#fff",
            // borderRadius: "10px",
            // justifyContent: "center",
            // display: "flex",
            // flexDirection: "row",
            // maxWidth: "1000px",
          }
        }
      >
        <Layout
          style={{
            padding: "30px 30px 30px 30px",
            margin: "30px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            // justifyContent: "center",
            display: "flex",
            flexDirection: "row",

            width: "800px",
          }}
        >
          <Form name="basic" layout="vertical">
            <div
              style={{
                // margin: "0 auto",
                // lineHeight: "40px",
                padding: "50px",
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
                ORGANISATION DETAILS
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
                  style={{ width: "300px" }}
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
                  style={{ width: "300px" }}
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
                  style={{ width: "300px" }}
                />
              </Form.Item>
            </div>
          </Form>
        </Layout>
      </Layout>
    );
  }
};
export default OrganisationDetailsPage;
