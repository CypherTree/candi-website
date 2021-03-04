import React, { useEffect, useState } from "react";

import { Button, Col, Layout, Modal, Row, Spin, Typography } from "antd";
import Title from "antd/lib/typography/Title";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import * as H from "history";

import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";
import { StateType } from "../../core/redux/types";
import {
  getOrgIdFromTenantName,
  getTenantInfo,
} from "../../core/services/tenantinfo";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import axios from "axios";

const { Text } = Typography;

export type UserDataProps = {
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  is_verified: boolean;
  last_login: string;
  last_name: string;
  phone_number: string;
  phone_number_extenstion: string;
  privacy_policy_accepted: boolean;
  profile_picture: string;
  profile_picture_process_status: string;
};

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
  userData?: UserDataProps;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  setAuthenticated: () => void;
  state: StateProps;
  logoutUser: () => void;
  getNewToken: (accessToken: string, refreshToken: string) => void;
};

const Dashboard: React.FC<Props> = ({ state }) => {
  const [loading, setLoading] = useState(true);

  const [tenant, setTenant] = useState<string | undefined>();
  const [isTrialExpired, setIsTrialExpired] = useState<boolean>(false);

  const userData = state.auth.userData ? state.auth.userData : null;

  useEffect(() => {
    if (userData?.first_name) {
      setLoading(false);
    }
  }, [userData]);

  let orgData;

  const getTrialStatus = async () => {
    orgData = await getOrgIdFromTenantName();
    console.log("<----------- ORG DATA -------->", orgData);
  };
  const getOrgData = async () => {
    const { accessToken } = getCurrentSessionTokens();
    const jwtToken = `Bearer ${accessToken}`;
    const slug = getTenantInfo();

    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/organization/?slug=${slug}
  `,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);

        setIsTrialExpired(response.data.data[0].organization.plan_has_expired);
      })
      .catch((err: any) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    const data: string | undefined = getTenantInfo();
    setTenant(data);
    getOrgData();
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Spin />
      </Layout>
    );
  } else {
    return (
      <div>
        {userData && userData.privacy_policy_accepted ? (
          <>
            <br />
            {tenant !== "id" ? (
              <Title level={3}>Welcome to "{tenant}"</Title>
            ) : (
              <>
                <Title level={4}>Welcome</Title>
                <br />
                <Title level={4}>
                  {userData !== null && userData.last_name},{" "}
                  {userData !== null && userData.first_name}
                </Title>
              </>
            )}
            <img
              src="https://image.freepik.com/free-vector/flat-design-colorful-characters-welcoming_23-2148271988.jpg"
              height="500px"
              width="800px"
              alt="welcome"
            />
          </>
        ) : (
          <div style={{ padding: "20px 50px 50px 50px" }}>
            <Row>
              <Col span={24}>
                <PrivacyPolicy />
              </Col>
            </Row>
            <br />
          </div>
        )}
        {isTrialExpired && (
          <Modal
            centered
            width="600px"
            visible={isTrialExpired}
            closable={false}
            footer={null}
          >
            <Layout
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Title type="danger" level={3}>
                Your trial plan has expired.
              </Title>
              <Text>Kindly upgrade your plan to continue.</Text>
              <Button type="primary" style={{ margin: "20px" }}>
                Upgrade Now
              </Button>
            </Layout>
          </Modal>
        )}
      </div>
    );
  }
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    //
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
