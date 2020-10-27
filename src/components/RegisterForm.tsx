import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  // TODO: integrate API

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pasword2, setPassword2] = useState("");
  const [otp, setOtp] = useState("");

  let successMessage;

  const handleFormSubmit = () => {
    successMessage = "Check your email for password reset link";
    alert(successMessage);
    console.log("value of error", successMessage);
  };

  return (
    <div>
      <Card style={{ backgroundColor: "whitesmoke" }}>
        <CardHeader title="Register Form" />
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
            <TextField
              //   error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              value={password}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              //   error={state.isError}
              fullWidth
              id="password2"
              type="password"
              label="Re-enter Password"
              placeholder="Re-enter Password "
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              //   error={state.isError}
              fullWidth
              id="otp"
              type="otp"
              label="OTP"
              placeholder="OTP"
              margin="normal"
              value={otp}
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
            Register
          </Button>
        </CardActions>
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

export default RegisterForm;
