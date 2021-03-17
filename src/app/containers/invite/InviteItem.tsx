import React, { useEffect, useState } from "react";

import { Typography, Layout, Button, Row, Col, Avatar } from "antd";
import Title from "antd/lib/typography/Title";

import axios from "axios";

import { getCurrentSessionTokens } from "../../../auth/core/services/session";

const { Text } = Typography;

export enum InvitationStatus {
  NOT_SENT = 0,
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  CANCELLED = 4,
  EXPIRED = 5,
}

const InviteItem = (props: any) => {
  const { inviteData, setLoading, setShouldReload, getIncomingInvites } = props;

  const { accessToken } = getCurrentSessionTokens();

  const [inviteColor, setInviteColor] = useState<any>("secondary");

  const ActionsForPending = (
    <Row>
      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "10px",
          backgroundColor: "white",
        }}
      >
        <Button
          onClick={() => acceptInvite(inviteData.id)}
          type="primary"
          style={{ width: "100px", marginRight: "20px" }}
        >
          Accept
        </Button>
        <Button
          onClick={() => rejectInvite(inviteData.id)}
          danger
          style={{ width: "100px" }}
        >
          Reject
        </Button>
      </Layout>
    </Row>
  );

  const ActionsForOthers = (
    <Row>
      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "10px",
          backgroundColor: "white",
        }}
      >
        <Button type="primary">View Details</Button>
      </Layout>
    </Row>
  );

  useEffect(() => {
    if (inviteData.invite_status === 0) {
      setInviteColor("warning");
    } else if (inviteData.invite_status === 1) {
      setInviteColor("warning");
    } else if (inviteData.invite_status === 2) {
      setInviteColor("success");
    } else if (inviteData.invite_status === 3) {
      setInviteColor("danger");
    } else if (inviteData.invite_status === 4) {
      setInviteColor("danger");
    } else if (inviteData.invite_status === 5) {
      setInviteColor("danger");
    }
  }, []);

  const rejectInvite = (invite_id: number) => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/invitations/${invite_id}/`,
        { invite_status: 3 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api reject invite--> ", response.data);
        setShouldReload(true);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);
      });
  };

  const acceptInvite = (invite_id: number) => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/invitations/${invite_id}/`,
        { invite_status: 2 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api reject invite--> ", response.data);
        setShouldReload(true);
        getIncomingInvites();
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);
      });
  };

  return (
    <Layout
      style={{
        width: "600px",
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row gutter={8}>
        <Col span={6}>
          <Layout
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            {inviteData.inviting_organization &&
            inviteData.inviting_organization.logo ? (
              <img
                style={{
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                }}
                src={inviteData.inviting_organization.logo}
                alt="organization logo"
              ></img>
            ) : (
              <Avatar
                style={{
                  backgroundColor: "#F9650D",
                  fontSize: "40px",
                  width: "90px",
                  height: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  verticalAlign: "middle",
                }}
              >
                {inviteData.organization_name.charAt(0).toUpperCase() || "A"}
              </Avatar>
            )}
          </Layout>
        </Col>
        <Col span={12} style={{ paddingLeft: "10px" }}>
          <Row>
            <Title level={4}>{inviteData.organization_name}</Title>
          </Row>
          <Row style={{ display: "flex" }}>
            <Text>
              Role: <b> {inviteData.role_name}</b>
            </Text>
          </Row>
          <Row style={{ display: "flex" }}>
            <Text> Current Status:</Text>{" "}
            <Text
              type={inviteColor ? inviteColor : "secondary"}
              style={{ paddingLeft: "5px" }}
            >
              <b>{InvitationStatus[inviteData.invite_status]} </b>
            </Text>
          </Row>
          {InvitationStatus[inviteData.invite_status] == "PENDING"
            ? ActionsForPending
            : ActionsForOthers}
        </Col>
      </Row>
    </Layout>
  );
};

export default InviteItem;
