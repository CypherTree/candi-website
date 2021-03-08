import { Layout, Modal, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import AntSpinner from "../../components/spinner/AntSpinner";
import ClientList from "./ClientList";

import AddIcon from "@material-ui/icons/Add";
import AddClientModal from "./AddClientModal";
import { Link } from "react-router-dom";

const { Text } = Typography;

const AllClients = () => {
  const [loading, setLoading] = useState(true);

  const [clientList, setClientList] = useState<undefined | any>();

  const [shouldReload, setShouldReload] = useState<undefined | boolean>(false);

  const [showModal, setShowModal] = useState(false);

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const tenant = "cyphertree";

  const getAllClients = () => {
    axios
      .get(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/clients/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setClientList(response.data.data);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);

        toast.error("Some error occoured");
      });
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  useEffect(() => {
    getAllClients();
  }, []);

  useEffect(() => {
    if (shouldReload) {
      setLoading(true);
      getAllClients();
      setClientList(null);
      setShouldReload(false);
    }
  }, [shouldReload]);

  if (loading) {
    return <AntSpinner />;
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
                My Clients
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
          {clientList && clientList?.length > 0 ? (
            <ClientList
              loading={loading}
              setLoading={setLoading}
              clientList={clientList}
              setShouldReload={setShouldReload}
              getAllClients={getAllClients}
            />
          ) : (
            // <Text>You got some clients bob.</Text>
            <Title level={3}>You have no clients</Title>
          )}
        </div>

        {showModal && (
          <AddClientModal
            setShowModal={setShowModal}
            setShouldReload={setShouldReload}
          />
        )}
      </Layout>
    );
  }
};

export default AllClients;