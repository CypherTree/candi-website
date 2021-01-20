import React from "react";

import Title from "antd/lib/typography/Title";

import { Link } from "react-router-dom";

const NavbarTopMenu = (props: any) => {
  const { title, link } = props;
  return (
    <Link
      to={link}
      style={{
        textDecoration: "none",
        color: "white",
        marginRight: "10px",
      }}
    >
      <Title style={{ color: "black" }} level={5}>
        {title}
      </Title>
    </Link>
  );
};

export default NavbarTopMenu;
