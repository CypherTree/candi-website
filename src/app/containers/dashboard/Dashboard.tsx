import React, { useEffect, useState } from "react";
import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Link,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";

import { LogoutUser, GetNewToken } from "../../../auth/core/redux/actions";

import { connect } from "react-redux";

import { useDispatch } from "react-redux";

import { Card, CardHeader } from "@material-ui/core";

import { acceptPrivacyPolicy } from "../../../auth/core/services/privacypolicy.service";

function Dashboard(props: any) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : sessionStorage.getItem("accessToken");

  const refreshToken = localStorage.getItem("refreshToken")
    ? localStorage.getItem("refreshToken")
    : sessionStorage.getItem("refreshToken");

  const handleClick = () => {
    dispatch(LogoutUser());
  };

  const getNewToken = () => {
    if (accessToken !== null && refreshToken !== null) {
      dispatch(GetNewToken(accessToken, refreshToken));
    }
  };

  const userData = props.state.auth.userData ? props.state.auth.userData : null;

  console.log("user data", userData);

  useEffect(() => {}, [userData]);

  const handleAcceptPrivacyPolicy = () => {
    if (accessToken !== null) {
      acceptPrivacyPolicy(accessToken);
      setDisabled(true);
      setTimeout(() => {
        window.location.reload(true);
      }, 6000);
    }
  };

  console.log("User Data ", userData);

  return (
    <div>
      <Card>
        <Grid container direction="column">
          <Grid item>
            <Typography variant={"h2"} color="primary">
              {" "}
              Dashboard
            </Typography>
          </Grid>
          <Grid item>
            <Button color="secondary" onClick={() => handleClick()}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <CardHeader title="Welcome"></CardHeader>
        <CardContent>
          {userData === null ? (
            <div>
              <Typography variant="h4" component="h4" color="error">
                You need to accept Privacy policy before continuing.
              </Typography>
              <div>
                <br />{" "}
                {disabled ? (
                  <img
                    src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
                    alt="loading"
                  ></img>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAcceptPrivacyPolicy}
                  >
                    Accept privacy policy
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ alignContent: "center" }}>
              <SnackbarContent
                style={{
                  backgroundColor: "teal",
                }}
                message={
                  "Your Email verification is pending. Click Here to get verification link."
                }
                // action={action}
              />

              <Typography variant={"h3"} component="h2">
                {userData !== null && userData.last_name},{" "}
                {userData !== null && userData.first_name}
              </Typography>
            </div>
          )}
          <p>
            {" "}
            <b> Access token:</b> {accessToken}
          </p>

          <p>
            {" "}
            <b> Refresh token: </b> {refreshToken}
          </p>
        </CardContent>
        <CardActions style={{ alignItems: "center", textAlign: "center" }}>
          <Button onClick={getNewToken}>Get New Token</Button>
        </CardActions>
      </Card>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Dashboard);
