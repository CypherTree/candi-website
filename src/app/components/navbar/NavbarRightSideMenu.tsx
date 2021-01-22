import React from "react";

import { Avatar, Dropdown, Layout, Menu } from "antd";
import {
  SettingFilled,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

type Props = {
  handleLogout: () => void;
};

const NavbarRightSideMenu: React.FC<Props> = ({ handleLogout }) => {
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
  );
};

export default NavbarRightSideMenu;
