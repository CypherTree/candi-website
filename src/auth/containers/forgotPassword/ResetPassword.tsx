import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { APP_NAME } from "../../../app/core/constants";

import { connect } from "react-redux";

import { Grid } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { SetAuthenticated } from "../../../app/core/redux/app/actions";

import ResetPasswordForm from "../../components/forgotPassword/ResetPasswordForm";
import SideImage from "../../components/sideImage/SideImage";

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
const qs = require("query-string");

function ResetPassword(props: any) {
  const data = qs.parse(props.location.search);

  const dispatch = useDispatch();

  const { isAuthenticated } = props.state.auth;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (localStorage.getItem("accessToken")) {
      dispatch(SetAuthenticated());
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
          <ResetPasswordForm token={token} props={props} />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps)(ResetPassword);
