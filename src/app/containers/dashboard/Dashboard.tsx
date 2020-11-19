import React, { useEffect } from "react";

import { Button, Typography, Grid, SnackbarContent } from "@material-ui/core";

import { connect } from "react-redux";

import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";

import Navbar from "../../components/navbar/Navbar";

function Dashboard(props: any) {
  const userData = props.state.auth.userData ? props.state.auth.userData : null;

  console.log("user data", userData);

  useEffect(() => {}, [userData]);

  const action = (
    <Button
      color="primary"
      size="small"
      variant="contained"
      onClick={() => alert("Verification link sent")}
    >
      Send Verification Link
    </Button>
  );

  return (
    <div>
      <Navbar />
      {userData && userData.privacy_policy_accepted ? (
        <>
          <br />
          {userData && !userData.is_verified && (
            <div>
              <div style={{ alignContent: "center" }}>
                <SnackbarContent
                  style={{
                    margin: "0 auto",
                    backgroundColor: "teal",
                    width: "90vw",
                  }}
                  message={"Your Email verification is pending."}
                  action={action}
                ></SnackbarContent>
              </div>
            </div>
          )}
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

// {/* <Snackbar open={true} autoHideDuration={6000}>
//                 <Alert severity="error">This is an error message!</Alert>
//               </Snackbar> */}
