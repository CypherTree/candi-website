import React, { useState, useEffect } from "react";

import { Divider, Layout, Spin, Typography, message, Alert } from "antd";
import AddIcon from "@material-ui/icons/Add";

import Axios from "axios";

import AddPeople from "../../components/people/AddPeople";
import Title from "antd/lib/typography/Title";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

const { Text } = Typography;

interface Iroles {
  name: string;
  type: number;
  id?: number;
  uuid?: string;
}

interface ITenantRole {
  id: number;
  uuid: string;
  name: string;
  type: number;
}

interface IInviteData {
  id: number;
  name: string;
  email: string;
  tenant_role: ITenantRole;
}

const People = () => {
  const tenant = "cyphertree";

  const [loading, setLoading] = useState(true);
  const [openInviteForm, setOpenInviteForm] = useState(false);
  const [reloadRequired, setReloadRequired] = useState(false);

  const [oriRoles, setOriRoles] = useState<Iroles[]>([]);
  const [invites, setInvites] = useState<IInviteData[]>([]);

  const [allowedInvites, setAllowedInvites] = useState<number>(0);

  const [currentError, setCurrentError] = useState("");

  const getRolesFromAPI = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const jwtToken = `Bearer ${accessToken}`;

    let fData = [];

    await Axios.get(
      `http://${tenant}.thetobbers-staging.ml/api/v1/team/roles/`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response: any) => {
        fData = response.data.data;
        setOriRoles(fData);
        console.log("<--- role data --->", fData);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request could not be processed.");
      });
  };

  const getSentInvites = () => {
    const accessToken = localStorage.getItem("accessToken");

    Axios.get(
      `http://${tenant}.thetobbers-staging.ml/api/v1/team/invite/
      `,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log("invites sent --->", response.data);
        setInvites(response.data.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Request could not be processed.");
      });
  };

  const handleAddInviteForm = () => {
    setOpenInviteForm(true);
  };

  const handleCloseInviteForm = () => {
    setOpenInviteForm(false);
  };

  const getActivePlan = () => {
    const { accessToken } = getCurrentSessionTokens();

    const jwtToken = `Bearer ${accessToken}`;
    Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/plans/organization?organization_id=55`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        // setAllowedInvites(response.data.data.plan.id.quotas[0].value);
        setAllowedInvites(4);
      })
      .catch((err: any) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    getRolesFromAPI();
    getSentInvites();
    getActivePlan();
  }, []);

  useEffect(() => {
    if (reloadRequired) {
      getSentInvites();
      setReloadRequired(false);
    }
  }, [reloadRequired]);

  if (loading) {
    return (
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Spin />
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          alignItems: "left",
          textAlign: "left",
          paddingLeft: "150px",
          paddingTop: "20px",
        }}
      >
        {/* <br /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "300px",
            textAlign: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#696969	",
                width: "auto",
                margin: "10px 20px 5px 0 ",
                padding: "0",
              }}
            >
              PEOPLE
            </p>
          </div>
          <div>
            <div
              style={{
                borderRadius: "14px",
                backgroundColor: "#F9650D",
                margin: "0px",
                display: "flex",
                marginTop: "18px",
                height: "22px",
                width: "22px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon
                onClick={handleAddInviteForm}
                style={{
                  alignSelf: "center",
                  height: "19px",
                  width: "19px",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>
        {allowedInvites - invites.length > 0 ? (
          <Text>
            You have {allowedInvites - invites.length}{" "}
            {allowedInvites - invites.length > 1 ? "invites" : "invite"} left.
          </Text>
        ) : (
          <Text type="danger">
            Upgrade plan or remove previously added people to invite more.
          </Text>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          backgroundColor: "white",
          padding: "50px 50px 50px 50px",
          height: "100%",
          width: "1100px",
          maxHeight: "75vh",
          overflowY: "scroll",
          marginLeft: "150px",
          borderRadius: "10px",
          paddingRight: "20px",
        }}
      >
        {invites.length == 0 && (
          <Title level={5}>
            You have not invited anyone yet. Invite to get started.
          </Title>
        )}

        {invites.map((invite: any, i: number) => (
          <>
            {/* // TODO: remove this next logic / for expired only */}
            <AddPeople
              inviteData={invite}
              oriRoles={oriRoles}
              key={invite.id}
              setCurrentError={setCurrentError}
              setReloadRequired={setReloadRequired}
            />
            {i !== invites.length - 1 && <Divider />}
          </>
        ))}
        {openInviteForm && (
          <div>
            <Divider />
            <AddPeople
              handleCloseInviteForm={handleCloseInviteForm}
              oriRoles={oriRoles}
              setCurrentError={setCurrentError}
              setReloadRequired={setReloadRequired}
              setLoading={setLoading}
              getSentInvites={getSentInvites}
              canInvitePeople={allowedInvites - invites.length}
            />
          </div>
        )}
        {currentError && (
          <>
            <Text type="danger">{currentError}</Text>
            {/* <Alert message={currentError} type="error" showIcon /> */}
            {message.error(currentError)}
            <Divider />
          </>
        )}
      </div>
    </Layout>
  );
};

export default People;
