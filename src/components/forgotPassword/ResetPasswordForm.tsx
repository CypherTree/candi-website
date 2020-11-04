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

import { useDispatch } from "react-redux";

import { ResetPassword } from "../../core/store/auth/actions";

function ResetPasswordForm(props: any) {
  const { token: resetToken } = props;
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [pwdError, setPwdError] = useState("");

  const handleFormSubmit = () => {
    if (password === password2) {
      dispatch(ResetPassword(resetToken, password));
    }
  };

  useEffect(() => {
    if (password === password2) {
      setPwdError("");
    } else {
      setPwdError("Entered Passwords do not match.");
    }
  }, [password2, password]);

  const propData = props.props;

  return (
    <div>
      <Card style={{ backgroundColor: "whitesmoke", height: "500px" }}>
        <CardHeader title="Reset Password" />
        <CardContent>
          {propData.state &&
          propData.state.auth &&
          propData.state.auth.hasOwnProperty("success") ? (
            <div>
              {propData.state.auth.success ? (
                <Typography variant={"h5"} component={"h5"} color="primary">
                  {propData.state.auth.message}
                </Typography>
              ) : (
                <Typography variant={"h5"} component={"h5"} color="error">
                  {propData.state.auth.message}
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
                {pwdError !== "" && (
                  <Typography color="error"> {pwdError}</Typography>
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
}

export default ResetPasswordForm;
