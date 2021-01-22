import React from "react";

import { Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Sider from "antd/lib/layout/Sider";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SiderSubMenu from "./SiderSubMenu";

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
  state: StateProps;
  toggleCollapsed(): void;
  collapsed: boolean;
};

const Sidebar: React.FC<Props> = ({ state, toggleCollapsed, collapsed }) => {
  const { isAuthenticated } = state.auth;

  if (!isAuthenticated) {
    return <></>;
  } else {
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        style={{
          position: "fixed",
          overflow: "auto",
          height: "100vh",
          left: 0,
        }}
      >
        <Layout
          style={{
            float: "left",
            display: "flex",
            padding: "10px",
            flexDirection: "row",
            backgroundColor: "inherit",
            alignItems: "center",
          }}
        >
          {!collapsed ? (
            <>
              <MenuOutlined
                style={{
                  marginRight: "20px",
                  color: "white",
                  fontSize: "20px",
                }}
                onClick={toggleCollapsed}
              />
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Title style={{ color: "white" }} level={4}>
                  The Onboarders
                </Title>
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Title style={{ color: "white" }} level={3}>
                TOB
              </Title>
            </Link>
          )}
        </Layout>

        <SiderSubMenu collapsed={collapsed} />
      </Sider>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Sidebar);
