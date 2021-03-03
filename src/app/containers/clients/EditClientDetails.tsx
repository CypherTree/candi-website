import { Layout, Space } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import AntSpinner from "../../components/spinner/AntSpinner";
import EditClientForm from "./EditClientForm";

import { RollbackOutlined } from "@ant-design/icons";

const EditClientDetails = () => {
  const { accessToken } = getCurrentSessionTokens();

  let { clientId } = useParams();

  const jwtToken = `Bearer ${accessToken}`;

  const tenant = "cyphertree";

  type currentOrg = {
    id: 5;
    private_data: any;
    markets: any;
    is_active: boolean;
    created_at: "2021-03-02T17:47:57.490738+05:30";
    modified_at: "2021-03-02T17:47:57.490759+05:30";
    uuid: "eae32474-8578-457a-9e94-6ac287b0ecf4";
    name: "Client 5";
    website: "https://www.google.com";
    logo: null;
    logo_process_status: 0;
    email: null;
    address: null;
    country: null;
    state: null;
    city: "Pune";
    locality: null;
    pincode: null;
    about: "lkdsjlkfj";
    company_size: 4;
    year_established: "2020-02-01";
    organization: 55;
    owner: null;
  };

  const [clientData, setClientData] = useState<currentOrg | null | undefined>();

  const getClientData = () => {
    axios
      .get(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/clients/${clientId}/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setClientData(response.data.data);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);
        toast.error("Some error occoured");
      });
  };

  const onFinish = () => {};

  useEffect(() => {
    getClientData();
  }, []);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Layout>
        <AntSpinner />
      </Layout>
    );
  }
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
              Edit {clientData ? clientData.name : "Client"}
            </p>
          </div>
        </div>
        <Link to="/client/all">
          Back to All clients <RollbackOutlined />
        </Link>
        <div
          style={{
            backgroundColor: "white",
            marginTop: "30px",
            marginBottom: "30px",
            padding: "40px",
            width: "700px",
            borderRadius: "10px",
          }}
        >
          <EditClientForm clientData={clientData} />
        </div>
      </div>
    </Layout>
  );
};

export default EditClientDetails;
