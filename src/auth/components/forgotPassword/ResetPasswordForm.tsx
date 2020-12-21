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

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { ResetPassword } from "../../core/redux/actions";

import { StateType } from "../../../app/core/redux/types";

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

type Props = {
  resetPassword: (resetToken: string, password: string) => void;
  auth: AuthProps;
  token: string;
};

const ResetPasswordForm: React.FC<Props> = ({ resetPassword, token, auth }) => {
  const resetToken = token;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmit = () => {
    if (password === password2) {
      resetPassword(resetToken, password);
    }
  };

  useEffect(() => {
    if (password === password2) {
      setPasswordError("");
    } else {
      setPasswordError("Entered Passwords do not match.");
    }
  }, [password2, password]);

  return (
    <div>
      <Card style={{ backgroundColor: "whitesmoke", height: "500px" }}>
        <CardHeader title="Reset Password" />
        <CardContent>
          {auth && auth.hasOwnProperty("success") ? (
            <div>
              {auth.success ? (
                <Typography variant={"h5"} component={"h5"} color="primary">
                  {auth.message}
                </Typography>
              ) : (
                <Typography variant={"h5"} component={"h5"} color="error">
                  {auth.message}
                </Typography>
              )}
              <br />
              <br />
            </div>
          ) : (
            <div>
              <CardContent>
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="password2"
                  type="password"
                  label="Password2"
                  placeholder="Re-enter Password"
                  margin="normal"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {passwordError !== "" && (
                  <Typography color="error"> {passwordError}</Typography>
                )}
              </CardContent>

              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleFormSubmit}
                >
                  Reset Password
                </Button>
              </CardActions>
            </div>
          )}

          <div>
            Already a user?<Link to="/login">Go to login </Link>
          </div>
          <br />
          <div>
            Not a member? <Link to="/register">Sign Up</Link>
          </div>
        </CardContent>
      </Card>
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
    resetPassword: (resetToken: string, password: string) =>
      dispatch(ResetPassword(resetToken, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
