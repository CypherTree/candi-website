import React from "react";

import { Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Sider from "antd/lib/layout/Sider";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SiderSubMenu from "./SiderSubMenu";

const Sidebar = (props: any) => {
  const { isAuthenticated } = props.state.auth;
  const { toggleCollapsed, collapsed } = props;

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
