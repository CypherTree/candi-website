import React, { useEffect, useState } from "react";

import { Typography, Layout, Button, Row, Col, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";

const { Text } = Typography;

const WorkflowItem = (props: any) => {
  const { workflowData } = props;

  console.log("props", props);

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
        <Col span={18} style={{ paddingLeft: "10px" }}>
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Title
              level={4}
              style={{
                width: "80%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {workflowData.name}
            </Title>
            <div>
              {" "}
              {workflowData.for_organization ? (
                <Tag color="geekblue">For Self </Tag>
              ) : (
                <Tag color="magenta">For Client </Tag>
              )}
            </div>
          </Row>

          {workflowData.client_company && (
            <Row>
              <>
                <Tag color="geekblue">{workflowData.client_company.name}</Tag>
              </>
            </Row>
          )}

          {/* //TODO: When description is added */}

          {/* {workflowData.client_company &&
            workflowData.client_company.description && (
              <Row>
                <>
                  About : <Text>{workflowData.client_company.description}</Text>
                </>
              </Row>
            )} */}

          <Row style={{ paddingTop: "5px" }}>
            <Link to={`/workflow/${workflowData.id}/`}>
              <Button type="primary"> View/Edit Workflow</Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default WorkflowItem;
