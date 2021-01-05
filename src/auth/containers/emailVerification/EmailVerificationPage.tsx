import React, { useEffect } from "react";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

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

import * as H from "history";

import { EmailVerification } from "../../core/redux/actions";

import SideImage from "../../components/sideImage/SideImage";

const qs = require("query-string");

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
  emailVerificationMessage?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  emailVerification: (token: string) => void;
  state: StateProps;
  location: H.Location;
};

const EmailVerificationPage: React.FC<Props> = ({
  emailVerification,
  location,
  state,
}) => {
  const data = qs.parse(location.search);
  const { token } = data;

  useEffect(() => {
    if (token) {
      emailVerification(token);
    }
  }, [token]);

  return (
    <div>
      <Grid
        container
        spacing={0}
        style={{
          alignContent: "center",
          justifyContent: "center",
          paddingTop: "100px",
        }}
      >
        {/* <Grid item xs={1} sm={6}>
          <SideImage />
        </Grid> */}
        <Grid item xs={12} sm={6} color="red">
          <div>
            <Card>
              <CardHeader title="Email Verification" />
              <CardContent>
                {!state.auth.emailVerificationMessage && !state.auth.error && (
                  <Typography variant="h5" component="h5" color="primary">
                    Please wait while we verify your account
                  </Typography>
                )}
                {state.auth.error && (
                  <Typography variant="h4" component="h4" color="error">
                    {state.auth.error}
                  </Typography>
                )}
                {state.auth.emailVerificationMessage && (
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
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    emailVerification: (token: string) => dispatch(EmailVerification(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerificationPage);
