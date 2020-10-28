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

import { ClearState, ForgotPassword } from "../../core/store/auth/authActions";

import { useDispatch } from "react-redux";

function ForgotPasswordForm(props: any) {
  const dispatch = useDispatch();

  console.log("props", props);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    props.props.state &&
    props.props.state.auth &&
    props.props.state.auth.success
      ? setStatus(props.props.state.auth.success)
      : setStatus("");
  }, [props, status]);

  useEffect(() => {
    // to clear any previous error
    dispatch(ClearState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let successMessage;

  const handleFormSubmit = () => {
    successMessage = "Check your email for password reset link";
    dispatch(ForgotPassword(email));
  };

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
            onClick={handleFormSubmit}
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
