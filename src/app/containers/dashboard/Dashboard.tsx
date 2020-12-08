import React, { useEffect, useState } from "react";

import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardHeader,
  SnackbarContent,
  Card,
} from "@material-ui/core";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { connect } from "react-redux";

import * as H from "history";

import { LogoutUser, GetNewToken } from "../../../auth/core/redux/actions";

import { acceptPrivacyPolicy } from "../../../auth/core/services/privacypolicy";

import { getCurrentSessionTokens } from "../../../auth/core/services/session";

import { StateType } from "../../core/redux/types";

export type UserDataProps = {
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  is_verified: boolean;
  last_login: string;
  last_name: string;
  phone_number: string;
  phone_number_extenstion: string;
  privacy_policy_accepted: boolean;
  profile_picture: string;
  profile_picture_process_status: string;
};

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
  userData?: UserDataProps;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  setAuthenticated: () => void;
  state: StateProps;
  logoutUser: () => void;
  getNewToken: (accessToken: string, refreshToken: string) => void;
};

const Dashboard: React.FC<Props> = ({ logoutUser, getNewToken, state }) => {
  const [loading, setLoading] = useState(false);

  const { accessToken, refreshToken } = getCurrentSessionTokens();

  const handleLogout = () => {
    logoutUser();
  };

  const getNewAccessToken = () => {
    if (accessToken !== null && refreshToken !== null) {
      getNewToken(accessToken, refreshToken);
    }
  };

  const userData = state.auth.userData ? state.auth.userData : null;

  console.log("user data", userData);

  useEffect(() => {}, [userData]);

  const handleAcceptPrivacyPolicy = () => {
    if (accessToken !== null) {
      acceptPrivacyPolicy(accessToken);
      setLoading(true);
      setTimeout(() => {
        window.location.reload(true);
      }, 6000);
    }
  };

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
            <Button color="secondary" onClick={() => handleLogout()}>
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
                {loading ? (
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
          <Button onClick={getNewAccessToken}>Get New Token</Button>
        </CardActions>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    logoutUser: () => dispatch(LogoutUser()),
    getNewToken: (accessToken: string, refreshToken: string) =>
      dispatch(GetNewToken(accessToken, refreshToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
