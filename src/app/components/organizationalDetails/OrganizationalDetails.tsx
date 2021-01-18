import React, { useState, useEffect } from "react";

import Layout from "antd/lib/layout/layout";
import { Button, Form, Input, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import {
  CheckDomainName,
  SetOrganisationalDetails,
} from "../../core/redux/app/actions";
import { Height } from "@material-ui/icons";

const { Text } = Typography;

function OrganizationalDetails(props: any) {
  const dispatch = useDispatch();
  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data: any) => console.log(data);
  const [domain, setDomain] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationWebsite, setOrganisationWebsite] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    handleNext,
    //   domain,
    //   setDomain,
    //   // organisationWebsite,
    //   // setOrganisationWebsite,
    //   // organisationName,
    //   // setOrganisationName,
    currentOrganization,
  } = props;

  console.log("props in ogr details ", props);

  console.log("props in ogr details --> current org", currentOrganization);

  let fieldsDisabled = false;

  const handleNewSubmit = () => {
    currentOrganization.name = organisationName;
    currentOrganization.website = organisationWebsite;
    currentOrganization.domain = domain;

    if (isSubmitted) {
      handleNext();
    } else {
      dispatch(
        SetOrganisationalDetails(
          organisationName,
          organisationWebsite,
          domain,
          handleNext
        )
      );
    }

    // handleNext();
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
    console.log("Success:", values);
    handleNewSubmit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout style={{ padding: "30px 30px 0px 30px", backgroundColor: "#fff" }}>
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
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            // name="Organisation Name"
            rules={[
              {
                required: true,
                message: "Please input your Organisation Name!",
              },
            ]}
          >
            <Input
              onChange={(e) => setOrganisationName(e.target.value)}
              disabled={isSubmitted}
              placeholder="Organisation Name"
              value={organisationName}
            />
          </Form.Item>

          <Form.Item
            // name="Website"
            rules={[{ required: true, message: "Please input your Website!" }]}
          >
            <Input
              onChange={(e) => setOrganisationWebsite(e.target.value)}
              disabled={isSubmitted}
              placeholder="Website"
              value={organisationWebsite}
            />
          </Form.Item>

          <Form.Item
            // name="domain"
            rules={[{ required: true, message: "Please input your domain!" }]}
          >
            <Input
              onChange={(e) => setDomain(e.target.value)}
              disabled={isSubmitted}
              placeholder="Domain"
              value={domain}
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
                <CloseCircleFilled style={{ color: "red", fontSize: "20px" }} />
              </Text>
            )}
          </Form.Item>
        </Form>
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
        <Button type="primary" htmlType="submit" onClick={onFinish}>
          {isSubmitted ? "Next" : "Save and Next"}
        </Button>
      </div>
    </Layout>
  );
}

// style={{
//   display: "flex",
//   justifyContent: "center",
//   paddingTop: "10px",
// }}

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(OrganizationalDetails);
