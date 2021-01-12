import React, { useEffect, useState } from "react";

import axios from "axios";

import { Typography, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import OrganizationItem from "../organizationItem/OrganizationItem";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

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
      {loading && (
        <Typography variant="h5" component="h5">
          Loading.....{" "}
        </Typography>
      )}
      {data.length > 0 ? (
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
              {/* {console.log("current page", page)} */}
              {console.log("no of pages", numberOfPages)}
            </div>
          )}
        </div>
      ) : (
        <div>
          <br />
          <br />
          <Typography variant="h5" component="h5">
            <b>Setup your Organisation. </b>
          </Typography>
          <br />
          <br />
          <img
            height="400px"
            width="600px"
            src="https://cdn.dribbble.com/users/1170793/screenshots/5996967/work_pack_white-01.png"
          />
        </div>
      )}
    </div>
  );
};

export default OrganizationList;
