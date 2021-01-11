import React, { useState } from "react";

import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Layout } from "antd";
import Title from "antd/lib/typography/Title";
import Sider from "antd/lib/layout/Sider";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      style={{ width: "500px", height: "100vh" }}
    >
      <Layout
        style={{
          float: "left",
          display: "flex",
          padding: "10px",
          flexDirection: "row",
          backgroundColor: "inherit",
          alignItems: "center",
          // height: "100vh",
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
                // fontWeight: "bold",
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
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;

// float: "left",
// display: "flex",
// flexDirection: "row",
// backgroundColor: "inherit",
// alignItems: "center",
// padding: "10px",

// <div style={{ width: collapsed ? "250" : "50", backgroundColor: "red" }}>
{
  /* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      > */
}
{
  /* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} */
}
{
  /* </Button> */
}

// </div>

{
  /* <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        style={{ height: "100vh" }}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu> */
}
