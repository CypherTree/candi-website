import React, { useEffect, useState } from "react";

import { Button, Card, Layout, Spin, Typography } from "antd";
import Title from "antd/lib/typography/Title";

import * as H from "history";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { Divider } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

const { Text } = Typography;
const qs = require("query-string");

type Props = {
  location: H.Location;
};

export enum InvitationStatus {
  NOT_SENT = 0,
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  CANCELLED = 4,
  EXPIRED = 5,
}

const InviteLanding: React.FC<Props> = ({ location }) => {
  const data = qs.parse(location.search);

  console.log("--- data token ----", data);

  const { token } = data;

  const { accessToken } = getCurrentSessionTokens();

  const [loading, setLoading] = useState(true);
  const [inviteStatus, setInviteStatus] = useState<undefined | number>();
  const [error, setError] = useState<undefined | string>();

  const [rejectionMessage, setRejectionMessage] = useState<
    undefined | string
  >();

  const [rejectionError, setRejectionError] = useState<undefined | string>();
  const [rejectTried, setRejectTried] = useState<boolean>(false);

  const [acceptTried, setAcceptedTried] = useState<boolean>(false);

  const tokenValidation = (token: string) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/check-invite/`, {
        params: { token },
      })
      .then((response) => {
        console.log("response from token api ", response.data);
        setInviteStatus(response.data.data.invite_status);
        // setInviteStatus(5);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error --> ", err);
        setError("The link is invalid or expired. ");
        setLoading(false);
      });
  };

  const rejectInvite = () => {
    setLoading(true);
    setRejectTried(true);
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/reject-invite/`, {
        token,
      })
      .then((response) => {
        console.log("response from token api ", response.data);
        setRejectionMessage("Invite was rejected successfully.");
        setLoading(false);
      })
      .catch((err) => {
        console.log("error --> ", err);
        setRejectionError("Invite could not be rejected.");
        setLoading(false);
      });
  };

  type Decoded = {
    email: string;
    organization_name: string;
    tenant_role_name: string;
    user_present: boolean;
    organization_logo?: string;
  };

  let decoded: Decoded = jwt_decode(token);

  useEffect(() => {
    if (token) {
      tokenValidation(token);
    }
  }, [token]);

  // useEffect(() => {

  // }, []);

  const InvitationStatusCancelled = (
    <div style={{ paddingTop: "20px" }}>
      <Title level={5} type="danger">
        This invite was cancelled by the sender.
      </Title>
    </div>
  );

  const InvitationStatusRejected = (
    <div style={{ paddingTop: "20px" }}>
      <Title level={5} type="danger">
        This invite has already been rejected.
      </Title>
    </div>
  );

  const InvitationStatusAccepted = (
    <div style={{ paddingTop: "20px" }}>
      <Title level={5} type="warning">
        This invite has already been accepted.
      </Title>
    </div>
  );

  const InvitationStatusExpired = (
    <div style={{ paddingTop: "20px" }}>
      <Title level={5} type="danger">
        This invite is expired.
      </Title>
      <Text>Ask your admin to send another one.</Text>
    </div>
  );

  const InvitationStatusPending = (
    <>
      <div style={{ padding: "20px" }}>
        <Text strong>{decoded.email}</Text> has been invited by{" "}
        <Text strong>{decoded.organization_name}</Text> for the role{" "}
        <Text strong>{decoded.tenant_role_name}.</Text>
      </div>

      <div>
        <Button type="primary">Accept Invite</Button>{" "}
        <Button danger onClick={() => rejectInvite()}>
          Reject Invite
        </Button>
      </div>
    </>
  );

  if (accessToken) {
    return <Redirect to="/invites/all" />;
  } else if (loading) {
    return (
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <Spin />
        <Title level={4}>Validating your request...</Title>
      </Layout>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          maxWidth: "1500px",
          //   backgroundColor: "yellow",
        }}
      >
        <Card
          style={{
            backgroundColor: "white",
            padding: "20px",
            height: "300px",
            marginTop: "200px",
            borderRadius: "20px",
          }}
        >
          <Title level={3}>Invite screen</Title>
          <Divider />
          {error && (
            <div style={{ paddingTop: "20px" }}>
              <Title level={4} type="danger">
                {error}
              </Title>
              <Text>Contact your admin to send you a new invite.</Text>
            </div>
          )}
          {rejectTried && (
            <div style={{ padding: "20px" }}>
              {rejectionMessage ? (
                <Title level={5} type="success">
                  {rejectionMessage}
                </Title>
              ) : (
                <Title level={5} type="danger">
                  {rejectionError}
                </Title>
              )}
            </div>
          )}
          {acceptTried && (
            <div style={{ padding: "20px" }}>
              {decoded.user_present ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text> You are already a user on this platform.</Text>
                  <Text>
                    Kindly <Link to="/login">Login</Link> to accept this invite.
                  </Text>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text>
                    {" "}
                    You have to first register on this platform to accept this
                    invite.
                  </Text>
                  <Text>
                    {" "}
                    Click <Link to="/register">Register</Link> to proceed.
                  </Text>
                </div>
              )}
            </div>
          )}
          {!acceptTried && !rejectTried && (
            <>
              {inviteStatus == InvitationStatus.NOT_SENT && {
                InvitationStatusPending,
              }}
              {inviteStatus == InvitationStatus.PENDING && (
                <>
                  {decoded.organization_logo && (
                    <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                      <img
                        src={decoded.organization_logo}
                        alt=""
                        style={{
                          width: "75px",
                          height: "75px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "10px" }}>
                    <Text strong>{decoded.email}</Text> has been invited by{" "}
                    <Text strong>{decoded.organization_name}</Text> for the role{" "}
                    <Text strong>{decoded.tenant_role_name}.</Text>
                  </div>

                  <div>
                    <Button
                      onClick={() => setAcceptedTried(true)}
                      type="primary"
                      style={{ marginRight: "10px" }}
                    >
                      Accept Invite
                    </Button>
                    <Button danger onClick={() => rejectInvite()}>
                      Reject Invite
                    </Button>
                  </div>
                </>
              )}
              {inviteStatus == InvitationStatus.ACCEPTED &&
                InvitationStatusAccepted}
              {inviteStatus == InvitationStatus.REJECTED &&
                InvitationStatusRejected}
              {inviteStatus == InvitationStatus.CANCELLED &&
                InvitationStatusCancelled}
              {inviteStatus == InvitationStatus.EXPIRED &&
                InvitationStatusExpired}
            </>
          )}
        </Card>
      </div>
    );
  }
};

export default InviteLanding;
