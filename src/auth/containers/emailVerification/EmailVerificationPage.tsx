import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { EmailVerification } from "../../core/redux/actions";

const qs = require("query-string");

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

function EmailVerificationPage(props: any) {
  const dispatch = useDispatch();

  const data = qs.parse(props.location.search);
  const { token } = data;
  console.log("token", data);

  useEffect(() => {
    if (token) {
      dispatch(EmailVerification(token));
    }
  }, []);

  return (
    <div>
      <Typography variant="h2" component="h2">
        Email verification
      </Typography>
      token: <p>{token}</p>
      <Typography variant="h5" component="h5">
        Please wait while we verify your account
      </Typography>
      {props.state.auth.error && (
        <Typography variant="h4" component="h4" color="error">
          {props.state.auth.error}
        </Typography>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(EmailVerificationPage);
