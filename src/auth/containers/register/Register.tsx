import React, { useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";

import { connect } from "react-redux";

import { APP_NAME } from "../../../app/core/constants";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";

import RegisterForm from "../../components/register/RegisterForm";

const mainImage = require("../../../shared/assets/images/main-image.jpg");

const Register = (props: any) => {
  const { isAuthenticated } = props.state.auth;

  const { setAuthenticated } = props;

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
          <br />
          <RegisterForm props={props} />
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAuthenticated: () => dispatch(SetAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
