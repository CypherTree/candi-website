import React, { useEffect } from "react";

import { Avatar, Button, Dropdown, Menu, Layout } from "antd";
import Title from "antd/lib/typography/Title";
import {
  SettingFilled,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { connect, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import * as H from "history";

import { LogoutUser } from "../../../auth/core/redux/actions";
import { StateType } from "../../core/redux/types";

import EmailVerificationBar from "../../../auth/components/emailVerification/EmailVerificationBar";

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

  console.log("user data in navbar ", userData);

  useEffect(() => {}, [userData]);

  const handleLogout = () => {
    console.log("Logout user was called");
    handleClose();
    dispatch(LogoutUser());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu = (
    <Menu>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>My account</Menu.Item>
      <Menu.Item danger onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header
        style={{
          paddingTop: "15px",
          backgroundColor: "white",
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <Layout
          style={{
            float: "right",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <SearchOutlined
            style={{ marginLeft: "20px", color: "black", fontSize: "30px" }}
          />
          <SettingFilled
            style={{ marginLeft: "20px", color: "black", fontSize: "30px" }}
          />
          <BellOutlined
            style={{ marginLeft: "20px", color: "black", fontSize: "30px" }}
          />
          <Dropdown overlay={menu}>
            <Avatar
              style={{ marginLeft: "20px" }}
              icon={<UserOutlined style={{ fontSize: "20px" }} />}
            />
          </Dropdown>
        </Layout>

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
          <Link
            to="/organisations/all"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <Title style={{ color: "black" }} level={5}>
              Organisation
            </Title>
          </Link>
          <Link
            to="#"
            style={{
              textDecoration: "none",
              color: "black",
              paddingLeft: "30px",
            }}
          >
            <Title style={{ color: "black" }} level={5}>
              Your Clients
            </Title>
          </Link>
          <Link
            to="#"
            style={{
              textDecoration: "none",
              color: "black",
              paddingLeft: "30px",
            }}
          >
            <Title style={{ color: "black" }} level={5}>
              People
            </Title>
          </Link>
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
      <EmailVerificationBar />
    </>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
