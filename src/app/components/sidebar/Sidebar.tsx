import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Sider from "antd/lib/layout/Sider";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getTenantInfo } from "../../core/services/tenantinfo";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import axios from "axios";

const { SubMenu } = Menu;

const Sidebar = (props: any) => {
  const { isAuthenticated } = props.state.auth;

  const { toggleCollapsed, collapsed } = props;

  const [tenant, setTenant] = useState<null | undefined | string>(null);
  const [orgData, setOrgData] = useState<any>(null);

  const [isTrialExpired, setIsTrialExpired] = useState<boolean>(false);

  const SidebarMenuForTenant = (
    <>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to={isTrialExpired ? "#" : "/org/roles"}>Roles </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        <Link to={isTrialExpired ? "#" : "/settings/workflow"}>Workflow </Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
        <Menu.Item key="9">
          <Link to="/settings/org">Organisation </Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to="/settings/company">Billing </Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to="/settings/company-details">Company Details </Link>
        </Menu.Item>
        <Menu.Item key="12">
          <Link to="/settings/plan">Plan </Link>
        </Menu.Item>
      </SubMenu>
    </>
  );

  const SidebarMenuForAll = (
    <>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/organisations/all">Organisations </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<MailOutlined />}>
        <Link to="/invites/all">My Invitations </Link>
      </Menu.Item>
    </>
  );

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

        setOrgData(response.data.data[0].organization);
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
            <Title style={{ color: "white" }} level={3}>
              TOB
            </Title>
          )}
        </Layout>

        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          style={{ height: "100vh" }}
        >
          {tenant === "id" ? SidebarMenuForAll : SidebarMenuForTenant}
        </Menu>
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
