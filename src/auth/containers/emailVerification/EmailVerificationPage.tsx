import React, { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { EmailVerification } from "../../core/redux/actions";

import SideImage from "../../components/sideImage/SideImage";

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

  useEffect(() => {
    if (token) {
      dispatch(EmailVerification(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      <Grid container spacing={0}>
        {" "}
        <Grid item xs={1} sm={6}>
          <SideImage />
        </Grid>
        <Grid item xs={11} sm={6} color="red">
          <div>
            <Card>
              <CardHeader title="Email Verification" />
              <CardContent>
                {!props.state.auth.emailVerificationMessage &&
                  !props.state.auth.error && (
                    <Typography variant="h5" component="h5" color="primary">
                      Please wait while we verify your account
                    </Typography>
                  )}
                {props.state.auth.error && (
                  <Typography variant="h4" component="h4" color="error">
                    {props.state.auth.error}
                  </Typography>
                )}
                {props.state.auth.emailVerificationMessage && (
                  <Typography variant="h4" component="h4" color="primary">
                    Your e-mail is verified
                  </Typography>
                )}
                <br /> <br />
                <CardActions style={{ justifyContent: "center" }}>
                  <Link to="/forgot-password">
                    {" "}
                    <Button variant="contained" color="primary">
                      Continue to website
                    </Button>
                  </Link>
                </CardActions>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps)(EmailVerificationPage);
