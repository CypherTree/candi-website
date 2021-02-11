import React, { useState, useEffect } from "react";

import { Layout } from "antd";
import AntSpinner from "../../components/spinner/AntSpinner";

import axios from "axios";

import InviteList from "./InviteList";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

type InviteType = {
  id: number;
  email: string;
  role_name: string;
  role_type: number;
  job_uuid: any;
  job_title: any;
  organization_name: string;
  organization_id: number;
  invite_status: number;
};

const ViewIncomingInvites = () => {
  const [loading, setLoading] = useState(true);
  const [inviteList, setInviteList] = useState<undefined | InviteType[]>();
  const [shouldReload, setShouldReload] = useState<undefined | boolean>(false);

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/invitations/`, {
        headers: {
          Authorization: `${jwtToken}`,
        },
      })
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setInviteList(response.data.data);
      })
      .then(() => setLoading(false))
      .catch((err: any) => console.log("Err", err));
  }, [shouldReload]);

  if (loading) {
    return <AntSpinner />;
  } else {
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
                My Invitations
              </p>
            </div>
          </div>
          <InviteList
            loading={loading}
            setLoading={setLoading}
            inviteList={inviteList}
            setShouldReload={setShouldReload}
          />
        </div>
      </Layout>
    );
  }
};

export default ViewIncomingInvites;
