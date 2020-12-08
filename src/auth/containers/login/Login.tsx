import React, { useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import * as H from "history";

import "./login.css";

import { APP_NAME } from "../../../app/core/constants";

import LoginForm from "../../components/login/LoginForm";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";

import SideImage from "../../components/sideImage/SideImage";

import { getCurrentSessionTokens } from "../../core/services/session";

import { StateType } from "../../../app/core/redux/types";

const mainImage = require("../../../shared/assets/images/main-image.jpg");

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  setAuthenticated: () => void;
  state: StateProps;
};

const Login: React.FC<Props> = ({ setAuthenticated, state, history }) => {
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

  return (
    <div>
      <Grid container spacing={0}>
        {" "}
        <Grid item xs={1} sm={6}>
          <SideImage />
        </Grid>
        <Grid item xs={11} sm={6} color="red">
          <Typography variant="h3" color="primary" component="h2">
            {" "}
            {APP_NAME}
          </Typography>
          <br /> <br />
          <LoginForm auth={state.auth} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
