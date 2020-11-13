import React, { useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";

import { connect } from "react-redux";

import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";
import Navbar from "../../components/navbar/Navbar";

function Dashboard(props: any) {
  const userData = props.state.auth.userData ? props.state.auth.userData : null;

  useEffect(() => {}, [userData]);

  return (
    <div>
      <Navbar />
      {userData && !userData.privacy_policy_accepted ? (
        <>
          <br />
          <Typography variant="h3" component="h3">
            Welcome
          </Typography>
          <br />
          <Typography variant={"h4"} component="h4">
            {userData !== null && userData.last_name},{" "}
            {userData !== null && userData.first_name}
          </Typography>
        </>
      ) : (
        <div style={{ padding: "20px 50px 50px 50px" }}>
          <Grid container>
            <Grid item xs={12}>
              <PrivacyPolicy />
            </Grid>
          </Grid>
          <br />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Dashboard);
