import React, { useEffect, useState } from "react";

import { Typography, Layout, Button, Row, Col, Tag } from "antd";
import Title from "antd/lib/typography/Title";

import axios from "axios";

import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const { Text } = Typography;

const ClientItem = (props: any) => {
  const { clientData, setLoading, setShouldReload, getAllClients } = props;

  const { accessToken } = getCurrentSessionTokens();

  return (
    <Layout
      style={{
        width: "600px",
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row gutter={8}>
        <Col span={6}>
          <Layout
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            {clientData.logo ? (
              <img
                src={clientData.logo}
                alt="company logo"
                style={{ borderRadius: "50%", width: "100px", height: "100px" }}
              ></img>
            ) : (
              <div
                style={{
                  backgroundColor: "#ff9999",
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                }}
              ></div>
            )}
          </Layout>
        </Col>
        <Col span={18} style={{ paddingLeft: "10px" }}>
          <Row>
            <Title
              level={4}
              style={{
                width: "80%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: "0px",
                margin: "0px",
                textDecoration: "none",
              }}
            >
              {clientData.name}
            </Title>
          </Row>
          {clientData.markets.length > 0 &&
            clientData.markets.map((data: any) => (
              <Tag color="geekblue"> {data.name}</Tag>
            ))}
          <Row>
            <Text>{clientData.city} </Text>{" "}
            {clientData.country && <Text>, {clientData.country}</Text>}
          </Row>
          <Row>
            <Text>
              Year Established:{" "}
              {parseInt(clientData.year_established.slice(0, 4))}
            </Text>
          </Row>
          <Row style={{ paddingTop: "5px" }}>
            <Link to={`/client/${clientData.id}/`}>
              <Button type="primary"> View/Edit Client</Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default ClientItem;
