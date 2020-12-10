import React, { useEffect, useState } from "react";

import axios from "axios";

import { Typography, Grid } from "@material-ui/core";

import Pagination from "@material-ui/lab/Pagination";

import OrganizationItem from "../organizationItem/OrganizationItem";

interface IOrganization {
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

  const mod = count % perPage;

  const numberOfPages: number = count / perPage - mod;

  const numberofFinalPages = Math.trunc(numberOfPages) + 2;

  const accessToken = localStorage.getItem("accessToken");

  const jwtToken = `Bearer ${accessToken}`;

  const handlePageChange = async (e: any, page: any) => {
    setCurrentPage(page);
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/?is_owner=1&page=${page}&size=${perPage}`,
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
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/?is_owner=1&page=${currentPage}&size=${perPage}`,
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
  }, []);
  return (
    <div>
      {loading ? (
        <Typography variant="h5" component="h5">
          Loading.....{" "}
        </Typography>
      ) : (
        <div
          style={{
            paddingLeft: "150px",
          }}
        >
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data.map((organization) => (
              <Grid item xs={5}>
                <OrganizationItem data={organization} handleOpen={handleOpen} />
              </Grid>
            ))}
          </Grid>
          <br />
          <br />
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
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationList;
