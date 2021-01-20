import React, { useEffect } from "react";

import { Button, Layout } from "antd";

import { connect, useDispatch } from "react-redux";

import * as H from "history";

import { LogoutUser } from "../../../auth/core/redux/actions";
import { StateType } from "../../core/redux/types";

import EmailVerificationBar from "../../../auth/components/emailVerification/EmailVerificationBar";

import NavbarTopMenu from "./NavbarTopMenu";

import NavbarRightSideMenu from "./NavbarRightSideMenu";

const { Header } = Layout;

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

function Navbar(props: any) {
  const dispatch = useDispatch();

  const state = props.state;

  const userData = state.auth.userData ? state.auth.userData : null;

  useEffect(() => {}, [userData]);

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  return (
    <>
      <Header
        style={{
          paddingTop: "15px",
          backgroundColor: "white",
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <NavbarRightSideMenu handleLogout={handleLogout} />

        <Layout
          style={{
            float: "left",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center",
            paddingLeft: "10px",
            paddingTop: "5px",
          }}
        >
          <NavbarTopMenu title="Organisation" link="/organisations/all" />
          <NavbarTopMenu title="Your Clients" link="#" />
          <NavbarTopMenu title="People" link="#" />
          <Button
            type="primary"
            style={{
              width: "150px",
              height: "30px",
              textTransform: "none",
              marginLeft: "50px",
            }}
          >
            Add Job
          </Button>
        </Layout>
      </Header>

      {userData !== null && !userData.is_verified && <EmailVerificationBar />}
    </>
  );
}

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Navbar);
