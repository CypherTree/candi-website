import React, { useState } from "react";

import { Button, Card, Checkbox, Col, Layout, Row } from "antd";

import Title from "antd/lib/typography/Title";

import PrivacyPolicyText from "../../components/privacyPolicy/PrivacyPolicyText";

import { acceptPrivacyPolicy } from "../../../auth/core/services/privacypolicy";

// const { Text } = Typography;

const mainImage = require("../../../shared/assets/images/welcome-illustration.jpg");

const PrivacyPolicy = () => {
  const [disabled, setDisabled] = useState(false);

  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : sessionStorage.getItem("accessToken");

  const handleAcceptPrivacyPolicy = () => {
    if (accessToken !== null) {
      acceptPrivacyPolicy(accessToken);
      setDisabled(true);
      setTimeout(() => {
        window.location.reload(true);
      }, 6000);
    }
  };

  const [acceptPermissionChecked, setAcceptPermissionChecked] = useState(false);
  return (
    <Card
      style={{
        // border: "1px solid black",
        padding: "10px 50px 50px 50px",
        borderRadius: "10px",
      }}
    >
      <Title level={4} type="danger">
        You need to accept Privacy policy before continuing.
      </Title>

      <br />

      <Row gutter={10}>
        <Col span={12}>
          <img
            alt="logo"
            style={{ width: "100%", height: "500px" }}
            src={String(mainImage)}
          />
          <a href="https://www.freepik.com/vectors/banner">
            Banner vector created by stories - www.freepik.com
          </a>
        </Col>
        <Col span={12}>
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "500px",
            }}
          >
            <Layout style={{ alignItems: "center", paddingBottom: "15px" }}>
              {disabled ? (
                <div
                  style={{
                    // backgroundColor: "red",
                    height: "500px",
                    padding: "10px",
                    margin: "10px",
                    overflowY: "hidden",
                  }}
                >
                  <img
                    src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
                    alt="loading"
                    width="90%"
                  ></img>
                </div>
              ) : (
                <>
                  <Layout>
                    <div
                      style={{
                        backgroundColor: "#fff",
                        height: "450px",
                        padding: "20px",
                        margin: "10px",
                        overflowY: "scroll",
                      }}
                    >
                      <PrivacyPolicyText />
                    </div>
                  </Layout>

                  <span>
                    <Checkbox
                      checked={acceptPermissionChecked}
                      onChange={(e) =>
                        setAcceptPermissionChecked(!acceptPermissionChecked)
                      }
                    >
                      I accept all conditions.
                    </Checkbox>
                    <Button
                      type="primary"
                      onClick={handleAcceptPrivacyPolicy}
                      disabled={!acceptPermissionChecked}
                    >
                      Accept privacy policy
                    </Button>
                  </span>
                </>
              )}
            </Layout>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default PrivacyPolicy;
