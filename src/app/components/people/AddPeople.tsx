import React, { useState, useEffect } from "react";

import { Input, Form, Button, Select, Row, Col, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import Axios from "axios";

const { Option } = Select;

const { Text } = Typography;

const AddPeople = (props: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roleType, setRoleType] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const [inviteColor, setInviteColor] = useState<any>("secondary");

  const {
    oriRoles,
    inviteData,
    handleCloseInviteForm,
    setReloadRequired,
    setLoading,
    expired,
  } = props;

  const onFinish = (values: any) => {
    if (email === "") {
      setError("Email is required.");
    } else if (name === "") {
      setError("Name is required.");
    } else if (roleType === "" || roleType === "Role Type") {
      setError("RoleType is required.");
    } else {
      let tenant_role;
      const selectedRole = oriRoles.filter(
        (role: any) => role.name === roleType
      );
      tenant_role = selectedRole[0].id;

      setLoading(true);
      sendInvite({ name, email, tenant_role });
    }
  };

  const tenant = "cyphertree";

  const [inviteStatus, setInviteStatus] = useState("");

  const sendInvite = (props: any) => {
    const accessToken = localStorage.getItem("accessToken");

    const { name, email, tenant_role } = props;

    console.log("data here --> ", name, email, tenant_role);

    Axios.post(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/team/invite/`,
      [{ name, email, tenant_role }],
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        setReloadRequired(true);
        setName("");
        setEmail("");
        setRoleType("");
        setLoading(false);
      })
      .catch((err) => console.log("err", err));
  };

  const handleCancelInvite = () => {
    // setLoading(true);
    cancelSentInvite(inviteData.id);
  };

  const handleResendInvite = () => {
    // setLoading(true);
    resendExpiredInvite(inviteData.id);
  };

  const resendExpiredInvite = (inviteId: number) => {
    const accessToken = localStorage.getItem("accessToken");

    Axios.delete(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/team/invite/${inviteId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        setReloadRequired(true);
        setName("");
        setEmail("");
        setRoleType("");

        let tenant_role;
        const selectedRole = oriRoles.filter(
          (role: any) => role.name === roleType
        );
        tenant_role = selectedRole[0].id;

        sendInvite({ name, email, tenant_role });
        setLoading(false);
      })
      .catch((err) => console.log("err", err));
  };

  const cancelSentInvite = (inviteId: number) => {
    const accessToken = localStorage.getItem("accessToken");

    Axios.delete(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/team/invite/${inviteId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        setReloadRequired(true);
        setName("");
        setEmail("");
        setRoleType("");
        // setLoading(false);
      })
      .catch((err) => console.log("err", err));
  };

  const handleRoleTypeChange = (value: any) => {
    setRoleType(value);
  };

  useEffect(() => {
    if (inviteData && inviteData.hasOwnProperty("id")) {
      setName(inviteData.name);
      setEmail(inviteData.email);
      setRoleType(inviteData.tenant_role.name);
      setDisabled(true);

      // 0 = NOT SENT
      // 1 = PENDING
      // 2 = ACCEPTED
      // 3 = REJECTED
      // 4 = CANCELLED
      // 5 = EXPIRED
      if (expired) {
        setInviteStatus("Expired");
        setInviteColor("danger");
        inviteData.invite_status = 5;
      } else if (inviteData.invite_status === 0) {
        setInviteStatus("Not Sent");
        setInviteColor("warning");
      } else if (inviteData.invite_status === 1) {
        setInviteStatus("Pending");
        setInviteColor("warning");
      } else if (inviteData.invite_status === 2) {
        setInviteStatus("Accepted");
        setInviteColor("success");
      } else if (inviteData.invite_status === 3) {
        setInviteStatus("Rejected");
        setInviteColor("danger");
      } else if (inviteData.invite_status === 4) {
        setInviteStatus("Cancelled");
        setInviteColor("danger");
      } else if (inviteData.invite_status === 5) {
        setInviteStatus("Expired");
        setInviteColor("danger");
      }
    }
  }, []);

  return (
    <div style={{}}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          width: "1000px",
          paddingBottom: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row gutter={20}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col>
              <Form.Item style={{ width: "250px" }}>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disabled}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item style={{ width: "250px" }}>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={disabled}
                />
              </Form.Item>
            </Col>
            <Col>
              <Select
                style={{ width: "250px" }}
                placeholder="Role Type"
                value={roleType === "" ? "Role Type" : roleType}
                onChange={handleRoleTypeChange}
                disabled={disabled}
              >
                {oriRoles.map((role: any) => (
                  <Option
                    value={role.name}
                    key={role.id}
                    disabled={role.name === "Viewer"}
                  >
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              {disabled ? (
                inviteStatus === "Expired" ? (
                  <Form.Item style={{ paddingLeft: "50px" }}>
                    <Button type="primary" onClick={handleResendInvite}>
                      Resend Invite
                    </Button>
                  </Form.Item>
                ) : (
                  <Form.Item style={{ paddingLeft: "50px" }}>
                    <Button type="primary" onClick={handleCancelInvite}>
                      Cancel Invite
                    </Button>
                  </Form.Item>
                )
              ) : (
                <Form.Item style={{ paddingLeft: "50px" }}>
                  <Button type="primary" htmlType="submit">
                    Invite
                  </Button>
                  <Button
                    danger
                    style={{ marginLeft: "5px" }}
                    onClick={handleCloseInviteForm}
                  >
                    <CloseOutlined />
                  </Button>
                </Form.Item>
              )}
            </Col>
          </div>
        </Row>
        <Row>
          {disabled && (
            <Text type="secondary">
              Current Status :{" "}
              <Text type={inviteColor ? inviteColor : "secondary"}>
                {" "}
                {inviteStatus}
              </Text>
            </Text>
          )}
        </Row>
      </Form>

      {error && (
        <Row>
          <Text type="danger">{error}</Text>
        </Row>
      )}
    </div>
  );
};

export default AddPeople;
