import React, { useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import "./login.css";

import { APP_NAME } from "../../../app/core/constants";

import LoginForm from "../../components/login/LoginForm";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";

const mainImage = require("../../../shared/assets/images/main-image.jpg");

const Login = (props: any) => {
  const { setAuthenticated } = props;

  const { isAuthenticated } = props.state.auth;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (localStorage.getItem("accessToken")) {
      setAuthenticated();
    }
  });

  return (
    <div>
      <Grid container spacing={0}>
        {" "}
        <Grid item xs={1} sm={6}>
          <div className="fill">
            <img
              alt="logo"
              style={{ width: 100, height: "100vh" }}
              src={String(mainImage)}
            />
          </div>
        </Grid>
        <Grid item xs={11} sm={6} color="red">
          <Typography variant="h3" color="primary" component="h2">
            {" "}
            {APP_NAME}
          </Typography>
          <br /> <br />
          <LoginForm props={props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
