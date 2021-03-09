import { Layout, Spin } from "antd";
import React, { useState, useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import { toast } from "react-toastify";
import WorkflowList from "./WorkflowList";
import Title from "antd/lib/typography/Title";
import WorkflowModal from "./WorkflowModal";
import { getTenantInfo } from "../../core/services/tenantinfo";

const WorkflowMain = () => {
  const [loading, setLoading] = useState(false);

  const [workflowList, setWorkflowList] = useState<undefined | any>();

  const [shouldReload, setShouldReload] = useState<undefined | boolean>(false);

  const [showModal, setShowModal] = useState(false);

  const [clientList, setClientList] = useState<undefined | any>();

  const [workflowTypesList, setWorkflowTypesList] = useState<undefined | any>();

  const getAllWorkflowTypes = () => {
    axios
      .get(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/types/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setWorkflowTypesList(response.data.data);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);

        toast.error("Some error occoured");
      });
  };

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const tenant = getTenantInfo();

  const getAllWorkflows = () => {
    axios
      .get(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setWorkflowList(response.data.data);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);

        toast.error("Some error occoured");
      });
  };

  const getAllClients = () => {
    axios
      .get(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/clients/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("add new client from api --> ", response.data);
        setClientList(response.data.data);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);

        toast.error("Some error occoured");
      });
  };

  useEffect(() => {
    getAllWorkflows();
    getAllClients();
    getAllWorkflowTypes();
  }, []);

  useEffect(() => {
    if (shouldReload) {
      setWorkflowList([]);
      getAllWorkflows();
      setShouldReload(false);
    }
  }, [shouldReload]);

  const handleOpen = () => {
    setShowModal(true);
  };

  if (loading) {
    return (
      <Layout
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Spin />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div
          style={{
            alignItems: "left",
            textAlign: "left",
            paddingLeft: "150px",
            paddingTop: "20px",
            paddingBottom: "20px",
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
                All Workflows
              </p>

              <div
                style={{
                  borderRadius: "14px",
                  backgroundColor: "#F9650D",
                  margin: "0px",
                  display: "flex",
                  marginTop: "18px",
                  height: "22px",
                  width: "22px",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon
                  onClick={handleOpen}
                  style={{
                    alignSelf: "center",
                    height: "19px",
                    width: "19px",
                    color: "white",
                  }}
                />
              </div>
            </div>
          </div>
          {workflowList && workflowList?.length > 0 ? (
            <WorkflowList
              // loading={loading}
              setLoading={setLoading}
              workflowList={workflowList}
              setShouldReload={setShouldReload}
              getAllWorkflows={getAllWorkflows}
              workflowTypesList={workflowTypesList}
              clientList={clientList}
            />
          ) : (
            // <Text>You got some clients bob.</Text>
            <Title level={3}>You have no workflows</Title>
          )}
        </div>

        {showModal && (
          <WorkflowModal
            setShowModal={setShowModal}
            setShouldReload={setShouldReload}
            workflowTypesList={workflowTypesList}
            clientList={clientList}
          />
        )}
      </Layout>
    );
  }
};

export default WorkflowMain;
