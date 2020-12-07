import React, { useEffect, useState } from "react";

import axios from "axios";

import OrganizationItem from "../organizationItem/OrganizationItem";
import { Typography, Grid } from "@material-ui/core";

const OrganizationList = () => {
  const [data, setData] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const jwtToken = `Bearer ${accessToken}`;

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/?is_owner=1`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data.data);
        setData(response.data.data);
      })
      .catch((err: any) => console.log("Err", err));
  }, []);
  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "whitesmoke ",
        textAlign: "left",
      }}
    >
      <Typography variant="h5" component="h5" color="primary">
        {" "}
        <b>Organization List</b>
      </Typography>
      <br />

      <Grid container spacing={2}>
        {data.map((organization) => (
          <Grid item xs={5}>
            <OrganizationItem data={organization} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrganizationList;
