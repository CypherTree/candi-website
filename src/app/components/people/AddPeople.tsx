import React, { useState, useEffect, useRef } from "react";

import { Input, Form, Button, Select, Row, Col, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import Axios from "axios";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import ClientItem from "../../containers/clients/ClientItem";

const { Option } = Select;

const { Text } = Typography;

const AddPeople = (props: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roleType, setRoleType] = useState<any>();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [client, setClient] = useState<any>();

  const [isClient, setIsClient] = useState(false);

  const [inviteColor, setInviteColor] = useState<any>("secondary");

  const {
    oriRoles,
    inviteData,
    handleCloseInviteForm,
    setReloadRequired,
    setLoading,
    expired,
    clientList,
    setCurrentError,
    getSentInvites,
    canInvitePeople,
  } = props;

  const onFinish = async (values: any) => {
    if (email === "") {
      setError("Email is required.");
    } else if (name === "") {
      setError("Name is required.");
    } else if (roleType === "" || roleType === "Role Type") {
      setError("RoleType is required.");
    } else {
      let tenant_role;
      const selectedRole = oriRoles.filter(
        (role: any) => role.type === roleType
      );

      tenant_role = selectedRole[0].id;

      let selectedRoleType = selectedRole[0].type;

      type sendInvite = {
        name: string;
        email: string;
        tenant_role: number;
        client_company?: number;
      };

      const dataToPost: sendInvite = {
        name,
        email,
        tenant_role,
      };

      console.log("@@@@@ selected role type @@@ ", selectedRoleType);

      console.log("---- value of client ", client);

      if (selectedRoleType === 4) {
        dataToPost.client_company = client.key;
      }

      setLoading(true);
      await sendInvite({ dataToPost });
    }
  };

  const tenant = "cyphertree";

  const [inviteStatus, setInviteStatus] = useState("");

  const sendInvite = async (props: any) => {
    const accessToken = localStorage.getItem("accessToken");

    console.log("*** props in people ***", props);

    const { dataToPost } = props;

    // console.log("data here --> ", name, email, tenant_role);

    await Axios.post(
      `http://${tenant}.thetobbers-staging.ml/api/v1/team/invite/`,
      [dataToPost],
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        getSentInvites();
      })
      .then(() => {
        setReloadRequired(true);
        setName("");
        setEmail("");
        setRoleType("");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err.response);
        setLoading(false);
        // if (err.response.data.errors[0].email[0]) {
        //   setCurrentError(err.response.data.errors[0].email[0]);
        // }
        toast.error("Request could not be processed.");
      });
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
      `http://${tenant}.thetobbers-staging.ml/api/v1/team/invite/${inviteId}`,
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

        getSentInvites();
        let tenant_role;
        const selectedRole = oriRoles.filter(
          (role: any) => role.name === roleType
        );
        tenant_role = selectedRole[0].id;

        sendInvite({ name, email, tenant_role });
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Request could not be processed.");
      });
  };

  const cancelSentInvite = (inviteId: number) => {
    const accessToken = localStorage.getItem("accessToken");

    Axios.delete(
      `http://${tenant}.thetobbers-staging.ml/api/v1/team/invite/${inviteId}`,
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
      .catch((err) => {
        console.log("err", err);
        toast.error("Request could not be processed.");
      });
  };

  const handleRoleTypeChange = (value: any) => {
    console.log("role", value);
    setRoleType(value);
  };

  const handleSetClientId = (value: any) => {
    console.log("### value ###", value);
    setClient(value);
  };

  const setCurrentErrorClear = () => {
    setCurrentError("");
  };

  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    if (props.openInviteForm) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

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
      // if (expired) {
      //   setInviteStatus("Expired");
      //   setInviteColor("danger");
      //   inviteData.invite_status = 5;
      // } else
      if (inviteData.invite_status === 0) {
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

      if (inviteData.tenant_role && inviteData.tenant_role.type === 4) {
        setIsClient(true);
      }
    }
  }, []);

  if (canInvitePeople <= 0) {
    return (
      <div>
        <Text type="danger">You cannot invite more people.</Text>
      </div>
    );
  }
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setCurrentErrorClear();
                  }}
                  disabled={disabled}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item style={{ width: "250px" }}>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setCurrentErrorClear();
                  }}
                  disabled={disabled}
                />
              </Form.Item>
            </Col>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                      value={role.type}
                      key={role.id}
                      // disabled={role.type === 4}
                    >
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              {isClient && (
                <Col style={{ padding: "5px" }}>
                  <Select
                    style={{ width: "250px" }}
                    placeholder="Client Name"
                    value={
                      inviteData.client_company
                        ? inviteData.client_company.name
                        : ""
                    }
                    disabled={true}
                  >
                    <Option
                      value={
                        inviteData.client_company
                          ? inviteData.client_company.name
                          : ""
                      }
                      key={1}
                      disabled={true}
                    >
                      {inviteData.client_company
                        ? inviteData.client_company.name
                        : ""}
                    </Option>
                  </Select>
                </Col>
              )}
              {roleType === 4 && (
                <Col style={{ padding: "5px" }}>
                  <Select
                    labelInValue
                    style={{ width: "250px" }}
                    placeholder="Client Name"
                    value={client}
                    onChange={(e) => handleSetClientId(e)}
                    disabled={disabled}
                  >
                    {clientList.map((client: any) => (
                      <Option
                        value={client.id}
                        key={client.id}
                        // disabled={client.type === 4}
                      >
                        {client.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              )}
            </div>
            <Col>
              {disabled && inviteStatus === "Expired" && (
                <Form.Item style={{ paddingLeft: "50px" }}>
                  <Button type="primary" onClick={handleResendInvite}>
                    Resend Invite
                  </Button>
                </Form.Item>
              )}

              {disabled &&
                inviteStatus !== "Accepted" &&
                inviteStatus !== "Expired" && (
                  <Form.Item style={{ paddingLeft: "50px" }}>
                    <Button type="primary" onClick={handleCancelInvite}>
                      Cancel Invite
                    </Button>
                  </Form.Item>
                )}

              {!disabled && (
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

      <div ref={messagesEndRef} />

      {error && (
        <Row>
          <Text type="danger">{error}</Text>
        </Row>
      )}
    </div>
  );
};

export default AddPeople;
