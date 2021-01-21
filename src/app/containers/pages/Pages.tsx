import React, { useState, useEffect } from "react";

import Axios from "axios";

import { Card, Layout, Spin } from "antd";

import AddIcon from "@material-ui/icons/Add";
import AddPeople from "../../components/people/AddPeople";

const Pages = () => {
  const tenant = "zoom";

  interface role {
    role: [Iroles];
  }

  interface Iroles {
    name: string;
    type: number;
    id?: number;
    uuid?: string;
  }

  const [roles, setRoles] = useState<Iroles[]>([]);
  const [oriRoles, setOriRoles] = useState<Iroles[]>([]);
  const [openInviteForm, setOpenInviteForm] = useState(false);

  const [loading, setLoading] = useState(true);

  const [reloadRequired, setReloadRequired] = useState(false);

  useEffect(() => {
    if (reloadRequired) {
      getSentInvites();
      setReloadRequired(false);
    }
  }, [reloadRequired]);

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

  const [invites, setInvites] = useState<IInviteData[]>([]);

  const getRolesFromAPI = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const jwtToken = `Bearer ${accessToken}`;

    let fData = [];

    await Axios.get(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/team/roles/`,
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
      .catch((err) => console.log(err));
  };

  const getSentInvites = () => {
    const accessToken = localStorage.getItem("accessToken");

    Axios.get(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/team/invite/
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
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getRolesFromAPI();
    getSentInvites();
  }, []);

  const handleAddInviteForm = () => {
    setOpenInviteForm(true);
  };

  const handleCloseInviteForm = () => {
    setOpenInviteForm(false);
  };

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
        <br />
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
      </div>

      <div
        style={{
          marginTop: "50px",
          backgroundColor: "white",
          padding: "50px",
          width: "1075px",
          height: "100%",
          maxHeight: "75vh",
          overflowY: "scroll",
          marginLeft: "150px",
          borderRadius: "10px",
        }}
      >
        {invites.map((invite: any) => (
          <AddPeople
            inviteData={invite}
            oriRoles={oriRoles}
            key={invite.id}
            setReloadRequired={setReloadRequired}
          />
        ))}
        {openInviteForm && (
          <AddPeople
            handleCloseInviteForm={handleCloseInviteForm}
            oriRoles={oriRoles}
            setReloadRequired={setReloadRequired}
          />
        )}
      </div>
    </Layout>
  );
};

export default Pages;
