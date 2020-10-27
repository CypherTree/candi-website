import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { APP_NAME } from "../../core/constants";

import { connect } from "react-redux";
import "./login.css";

import LoginForm from "../../components/LoginForm";
import { Grid } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { SetAuthenticated } from "../../core/store/app/appActions";
const mainImage = require("../../assets/images/main-image.jpg");

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const Login = (props: any) => {
  const dispatch = useDispatch();
  // const message = props.state.app.message;
  console.log("props data ", props);

  const { isAuthenticated } = props.state.auth;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (localStorage.getItem("accessToken")) {
      dispatch(SetAuthenticated());
    }
  });

  return (
    <div>
      <Grid container spacing={0}>
        {" "}
        {/* <Box bgcolor="primary.main" color="primary.contrastText" p={2}> */}
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
        {/* </Box> */}
      </Grid>
    </div>
  );
};

export default connect(mapStateToProps)(Login);
