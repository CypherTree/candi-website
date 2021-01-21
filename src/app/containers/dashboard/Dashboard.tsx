import React, { useEffect, useState } from "react";

import { Col, Layout, Row, Spin } from "antd";
import Title from "antd/lib/typography/Title";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import * as H from "history";

import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";
import { StateType } from "../../core/redux/types";

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

  const userData = state.auth.userData ? state.auth.userData : null;

  useEffect(() => {
    if (userData?.first_name) {
      setLoading(false);
    }
  }, [userData]);

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
            <Title level={4}>Welcome</Title>
            <br />
            <Title level={4}>
              {userData !== null && userData.last_name},{" "}
              {userData !== null && userData.first_name}
            </Title>
            <img
              src="https://image.freepik.com/free-vector/flat-design-colorful-characters-welcoming_23-2148271988.jpg"
              height="500px"
              width="800px"
              alt="welcome illustrations"
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
