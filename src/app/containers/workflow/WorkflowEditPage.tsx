import { Layout } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import AntSpinner from "../../components/spinner/AntSpinner";

import { RollbackOutlined } from "@ant-design/icons";
import WorkflowEditForm from "./WorkflowEditForm";

const WorkflowEditPage = (props: any) => {
  return (
    <Layout>
      <div
        style={{
          alignItems: "left",
          textAlign: "left",
          paddingLeft: "150px",
          paddingTop: "20px",
        }}
      >
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "300px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#696969	",
                width: "auto",
                margin: "10px 20px 5px 0 ",
                padding: "0",
              }}
            >
              Edit Workflow
            </p>
          </div>
        </div>
        <Link to="/settings/workflow">
          Back to All Workflows <RollbackOutlined />
        </Link>
        <div
          style={{
            backgroundColor: "white",
            marginTop: "30px",
            marginBottom: "30px",
            padding: "40px",
            width: "1000px",
            borderRadius: "10px",
          }}
        >
          <WorkflowEditForm />
        </div>
      </div>
    </Layout>
  );
};

export default WorkflowEditPage;
