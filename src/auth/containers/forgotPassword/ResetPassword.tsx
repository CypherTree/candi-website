import React, { useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";

import { APP_NAME } from "../../../app/core/constants";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import * as H from "history";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";

import ResetPasswordForm from "../../components/forgotPassword/ResetPasswordForm";

import SideImage from "../../components/sideImage/SideImage";

import { getCurrentSessionTokens } from "../../core/services/session";

import { StateType } from "../../../app/core/redux/types";

const mainImage = require("../../../shared/assets/images/main-image.jpg");

const qs = require("query-string");

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  location: H.Location;
  setAuthenticated: () => void;
  state: StateProps;
};

const ResetPassword: React.FC<Props> = ({
  history,
  location,
  setAuthenticated,
  state,
}) => {
  const data = qs.parse(location.search);

  const { isAuthenticated } = state.auth;

  const { accessToken } = getCurrentSessionTokens();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    if (accessToken) {
      setAuthenticated();
    }
  });

  const { token } = data;

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={1} sm={6}>
          <SideImage />
        </Grid>
        <Grid item xs={11} sm={6}>
          <Typography variant="h3" color="primary" component="h2">
            {" "}
            {APP_NAME}
          </Typography>
          <br /> <br />
          <ResetPasswordForm token={token} auth={state.auth} />
        </Grid>
      </Grid>
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
    setAuthenticated: () => dispatch(SetAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
