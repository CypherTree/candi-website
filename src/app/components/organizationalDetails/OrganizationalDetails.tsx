import React, { useState, useEffect } from "react";

import { Typography, Input, Form, Button, Spin } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";

import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import {
  CheckDomainName,
  SetOrganisationalDetails,
} from "../../core/redux/app/actions";

const { Text } = Typography;

const OrganizationalDetails = (props: any) => {
  const dispatch = useDispatch();

  const [domain, setDomain] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationWebsite, setOrganisationWebsite] = useState("");

  const [currentError, setCurrentError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { handleNext, currentOrganization, loading, setLoading } = props;

  console.log("props in org details --> ", props);
  console.log("props in org details --> current org", currentOrganization);

  let fieldsDisabled = false;

  const handleNewSubmit = () => {
    currentOrganization.name = organisationName;
    currentOrganization.website = organisationWebsite;
    currentOrganization.domain = domain;

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (isSubmitted) {
      handleNext();
    } else {
      if (domain.length <= 4) {
        setCurrentError("Domain should be atleast 4 characters.");
      } else if (!organisationWebsite.match(regex)) {
        setCurrentError("Please enter website in required format.");
      } else {
        if (props.state.app.domainCheckMessage === "Domain available") {
          setLoading(true);
          dispatch(
            SetOrganisationalDetails(
              organisationName,
              organisationWebsite,
              domain,
              handleNext,
              setLoading
            )
          );
          setCurrentError("");
        } else {
          setCurrentError("This domain cannot be selected.");
        }
      }
    }
  };

  useEffect(() => {
    if (
      props.state.app &&
      props.state.app.newOrganisation &&
      props.state.app.newOrganisation.message === "Organization created"
    ) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fieldsDisabled = true;
    }
  }, [fieldsDisabled]);

  useEffect(() => {
    if (currentOrganization.name) {
      setOrganisationName(currentOrganization.name);
      setIsSubmitted(true);
      setDomain(currentOrganization.domain);
      setOrganisationWebsite(currentOrganization.website);
    }

    if (props.state.app.currentOrganization) {
      if (props.state.app.currentOrganization.name) {
        setOrganisationName(props.state.app.currentOrganization.name);
        setIsSubmitted(true);
        setDomain(props.state.app.currentOrganization.slug);
        setOrganisationWebsite(props.state.app.currentOrganization.website);
      }
    }
  }, []);

  const handleDomainURLChange = (e: any) => {
    setDomain(e.target.value);
    setCurrentError("");

    if (domain.length >= 4) {
      dispatch(
        CheckDomainName(
          e.target.value,
          localStorage.getItem("accessToken") || ""
        )
      );
    }
  };

  const onFinish = (values: any) => {
    handleNewSubmit();
  };

  const onFinishFailed = (values: any) => {};

  if (loading) {
    return (
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "500px",
          backgroundColor: "white",
        }}
      >
        <Spin />
      </Layout>
    );
  } else {
    return (
      <Form
        name="basic"
        initialValues={{
          organisationName: props.state.app.currentOrganization.name
            ? props.state.app.currentOrganization.name
            : currentOrganization.name,
          organisationWebsite: props.state.app.currentOrganization.website
            ? props.state.app.currentOrganization.website
            : currentOrganization.website,
          domain: props.state.app.currentOrganization.slug
            ? props.state.app.currentOrganization.slug
            : currentOrganization.domain,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Layout
          style={{ padding: "30px 30px 0px 30px", backgroundColor: "#fff" }}
        >
          <div
            style={{
              margin: "0 auto",
              lineHeight: "40px",
              width: "800px",
              padding: "100px",
              paddingTop: "0px",
              paddingBottom: "0px",
              height: "400px",
            }}
          >
            <Title
              level={4}
              style={{
                fontWeight: "bold",
                alignSelf: "center",
                textAlign: "center",
                paddingBottom: "10px",
              }}
            >
              Enter Organisation Details
            </Title>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your Organisation Name!",
                },
              ]}
              name="organisationName"
            >
              <Input
                onChange={(e) => setOrganisationName(e.target.value)}
                disabled={isSubmitted}
                placeholder="Organisation Name"
              />
            </Form.Item>

            <Form.Item
              name="organisationWebsite"
              rules={[
                { required: true, message: "Please input your Website!" },
              ]}
              extra="example: google.com"
            >
              <Input
                onChange={(e) => {
                  setOrganisationWebsite(e.target.value);
                  setCurrentError("");
                }}
                disabled={isSubmitted}
                placeholder="Website"
                // value={organisationWebsite}
              />
            </Form.Item>

            <Form.Item
              name="domain"
              rules={[{ required: true, message: "Please input your domain!" }]}
            >
              <Input
                onChange={(e) => handleDomainURLChange(e)}
                disabled={isSubmitted}
                placeholder="Domain"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Title level={5}>
                {domain === "" ? "your-domain" : domain}.theonboarders.com
              </Title>
            </Form.Item>

            <Form.Item>
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
            </Form.Item>
            {currentError && <Text type="danger">{currentError}</Text>}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button color="primary" disabled style={{ marginRight: "10px" }}>
              Back
            </Button>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isSubmitted ? "Next" : "Save and Next"}
              </Button>
            </Form.Item>
          </div>
        </Layout>
      </Form>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(OrganizationalDetails);
