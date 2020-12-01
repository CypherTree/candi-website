import React, { useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";

import { APP_NAME } from "../../../app/core/constants";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";

import ResetPasswordForm from "../../components/forgotPassword/ResetPasswordForm";

import { getCurrentSessionTokens } from "../../core/services/session";

const mainImage = require("../../../shared/assets/images/main-image.jpg");

const qs = require("query-string");

const ResetPassword = (props: any) => {
  const data = qs.parse(props.location.search);

  const { setAuthenticated } = props;

  const { isAuthenticated } = props.state.auth;

  const { accessToken } = getCurrentSessionTokens();

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
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
          <div className="fill">
            <img
              alt="logo"
              style={{ width: 100, height: "100vh" }}
              src={String(mainImage)}
            />
          </div>
        </Grid>

        <Grid item xs={11} sm={6}>
          <Typography variant="h3" color="primary" component="h2">
            {" "}
            {APP_NAME}
          </Typography>
          <br /> <br />
          <ResetPasswordForm token={token} props={props} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => {
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
