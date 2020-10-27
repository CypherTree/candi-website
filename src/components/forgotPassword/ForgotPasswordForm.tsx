import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ForgotPassword } from "../../core/store/auth/authActions";

import { useDispatch } from "react-redux";

function ForgotPasswordForm(props: any) {
  // TODO: integrate API

  const dispatch = useDispatch();

  console.log("---- props out hre", props.props);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log("status", status);
    props.props.state &&
    props.props.state.auth &&
    props.props.state.auth.success
      ? setStatus(props.props.state.auth.success)
      : setStatus("");
  }, [props, status]);

  let successMessage;

  // props.props.state && props.props.state.auth && props.props.state.auth.status
  //   ? setStatus(props.props.state.auth.status)
  //   : setStatus("");

  const handleFormSubmit = () => {
    successMessage = "Check your email for password reset link";
    // alert(successMessage);
    console.log("value of error", successMessage);
    // dispatch(ResetPassword(resetToken, password));
    dispatch(ForgotPassword(email));
  };

  // const status =
  //   ? props.props?.state?.auth?.status
  //   : null;

  return (
    <div>
      <Card style={{ backgroundColor: "whitesmoke", height: "500px" }}>
        <CardHeader title="Forgot Password" />{" "}
        <CardContent>
          <div>
            {successMessage !== null && (
              <Typography color="primary">{successMessage}</Typography>
            )}
            <TextField
              //   error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email Id "
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            // className={classes.loginBtn}
            onClick={handleFormSubmit}
            // disabled={state.isButtonDisabled}
          >
            Get password reset link
          </Button>
        </CardActions>{" "}
        {props.props.state &&
        props.props.state.auth &&
        props.props.state.auth.hasOwnProperty("success") &&
        props.props.state.auth.success === true ? (
          <div>
            <Typography variant="h5" component="h5" color="primary">
              {props.props.state.auth.message}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h5" component="h5" color="error">
              {props.props.state.auth.message}
            </Typography>
          </div>
        )}
        <CardContent>
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

export default ForgotPasswordForm;
