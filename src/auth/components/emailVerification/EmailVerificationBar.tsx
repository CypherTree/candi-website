import React, { useState } from "react";

import { Button, Col, Layout, Row } from "antd";

import { resendVerificationEmail } from "../../core/services/emailverification";

const EmailVerificationBar = () => {
  const [disabledButton, setDisabledButton] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const snackbarMessage = (
    <>
      {message ? (
        <p style={{ margin: "0", padding: "0", paddingTop: "5px" }}>
          {" "}
          {message} If you do not find it in Inbox, check in Spam folder.
        </p>
      ) : (
        <p style={{ margin: "0", padding: "0", paddingTop: "5px" }}>
          {" "}
          Your Email verification is pending. Please verify your e-mail.
        </p>
      )}
    </>
  );

  const handleSendVerificationEmail = () => {
    resendVerificationLink();
    setDisabledButton(true);
  };

  const resendVerificationLink = async () => {
    const responseFromAPi = await resendVerificationEmail();
    setMessage(responseFromAPi);
  };

  return (
    <Layout style={{ backgroundColor: "#FBC4C4" }}>
      <Row>
        <Col span={16} offset={5}>
          <div
            style={{
              alignContent: "center",
              justifyContent: "space-around",
              display: "flex",
              flexDirection: "row",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            {snackbarMessage}

            <Button
              type="text"
              onClick={handleSendVerificationEmail}
              disabled={disabledButton}
              style={{
                borderRadius: "10px",
                // border: "1px solid #4A4A4A",
                // margin: "5px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  margin: "0",
                  padding: "0",
                  color: "#1890ff",
                }}
              >
                Get Verification Link{" "}
              </p>
            </Button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default EmailVerificationBar;
