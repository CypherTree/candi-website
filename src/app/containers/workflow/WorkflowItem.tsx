import React, { useEffect, useState } from "react";

import { Typography, Layout, Button, Row, Col, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import { Link } from "react-router-dom";

const { Text } = Typography;

const WorkflowItem = (props: any) => {
  //     client_company: null
  // for_organization: true
  // id: 1
  // name: "WF1"

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
              flexDirection: "column",
              justifyContent: "space-between",
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
                <Tag color="geekblue">For self organisation</Tag>
              ) : (
                <Tag color="magenta">For Client Company</Tag>
              )}
            </div>
          </Row>

          <Row style={{ paddingTop: "5px" }}>
            <Link
              to="#"
              // to={`/client/${clientData.id}/`}
            >
              <Button type="primary"> View/Edit Workflow</Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default WorkflowItem;

//  {/* <Col span={6}>
//           <Layout
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignContent: "center",
//               alignItems: "center",
//               width: "100%",
//               height: "100%",
//               backgroundColor: "white",
//             }}
//           >
//             {/* <div
//               style={{
//                 backgroundColor: "#ff9999",
//                 borderRadius: "50%",
//                 width: "100px",
//                 height: "100px",
//               }}
//             ></div> */}
//             </Layout>
//         </Col> */}
