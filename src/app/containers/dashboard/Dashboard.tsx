import React, { useEffect, useState } from "react";

import { Button, Typography, Grid, SnackbarContent } from "@material-ui/core";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { connect } from "react-redux";

import * as H from "history";

import { LogoutUser, GetNewToken } from "../../../auth/core/redux/actions";

import { acceptPrivacyPolicy } from "../../../auth/core/services/privacypolicy";

import { getCurrentSessionTokens } from "../../../auth/core/services/session";

import { StateType } from "../../core/redux/types";

import Navbar from "../../components/navbar/Navbar";

import EmailVerificationBar from "../../../auth/components/emailVerification/EmailVerificationBar";

import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";

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

const Dashboard: React.FC<Props> = ({ state }) => {
  const [loading, setLoading] = useState(false);

  const userData = state.auth.userData ? state.auth.userData : null;

  useEffect(() => {}, [userData]);

  return (
    <div>
      {userData && userData.privacy_policy_accepted ? (
        <>
          {userData && userData.is_verified && (
            <div>
              <div style={{ alignContent: "center" }}>
                <EmailVerificationBar />
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
          <img
            src="https://image.freepik.com/free-vector/flat-design-colorful-characters-welcoming_23-2148271988.jpg"
            height="500px"
            width="800px"
          />
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
