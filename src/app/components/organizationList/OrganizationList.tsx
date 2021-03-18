import React, { useEffect, useState } from "react";

import { Layout, Row, Col, Spin } from "antd";
import Title from "antd/lib/typography/Title";

import axios from "axios";

import Pagination from "@material-ui/lab/Pagination";

import OrganizationItem from "../organizationItem/OrganizationItem";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import { toast } from "react-toastify";

interface IOrganization {
  type: any;
  organization: any;
  address: string;
  billing_address: string;
  billing_email: string;
  city: string;
  country: string;
  domain_url: string;
  email: string;
  gst: string;
  id: number;
  locality: string;
  logo: string;
  logo_process_status: number;
  name: string;
  owner: number;
  pincode: string;
  roles_added: number;
  schema_name: string;
  slug: string;
  state: string;
  website: string;
  workflow_added: number;
}

const OrganizationList = (props: any) => {
  const { handleOpen } = props;

  const [data, setData] = useState<IOrganization[]>([]);

  const [count, setCount] = useState(6);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [perPage, setPerPage] = useState(6);

  // logic for calculating per page

  const mod = count % perPage;

  const newCount = count - mod;

  const numberOfPages: number = newCount / perPage;

  const offSet = mod === 0 ? 0 : 1;

  const numberofFinalPages = Math.trunc(numberOfPages) + offSet;

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const handlePageChange = async (e: any, page: any) => {
    setCurrentPage(page);
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/organization/?page=${page}&size=${perPage}`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setData(response.data.data);
        setCount(response.data.count);
      })
      .then(() => setLoading(false))
      .catch((err: any) => console.log("Err", err));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/organization/?page=${currentPage}&size=${perPage}`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setData(response.data.data);
        setCount(response.data.count);
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err.response);
        setLoading(false);
        if (err.response.data.detail) {
          toast.error(err.response.data.detail);
        } else {
          toast.error("Some error occoured");
        }
      });
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </Layout>
    );
  }

  return (
    <div>
      {data.length > 0 ? (
        <Layout
          style={{
            paddingLeft: "150px",
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "red",
          }}
        >
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "yellow",
            }}
          >
            {data.map((organization) => (
              <Col
                // span={12}
                md={{ span: 24 }}
                lg={{ span: 12 }}
                style={{
                  paddingTop: "15px",
                  // backgroundColor: "green"
                }}
              >
                <OrganizationItem
                  data={organization.organization}
                  handleOpen={handleOpen}
                  type={organization.type}
                />
              </Col>
            ))}
          </Row>

          <br />
          <br />
          {data.length >= perPage && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "30px",
              }}
            >
              <Pagination
                count={numberofFinalPages}
                variant="outlined"
                shape="rounded"
                color={"primary"}
                page={currentPage}
                size="large"
                onChange={(e, page) => {
                  handlePageChange(e, page);
                  setCurrentPage(page);
                }}
              />
              {console.log("number of final pages ", numberofFinalPages)}

              {console.log("no of pages", numberOfPages)}
            </div>
          )}
        </Layout>
      ) : (
        <div>
          <br />
          <br />
          <Title level={5}>
            <b>Setup your Organisation. </b>
          </Title>
          <br />
          <br />
          <img
            height="400px"
            width="600px"
            src="https://cdn.dribbble.com/users/1170793/screenshots/5996967/work_pack_white-01.png"
            alt="loading "
          />
        </div>
      )}
    </div>
  );
};

export default OrganizationList;
