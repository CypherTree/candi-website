import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

// import { ThunkDispatch as dispatch } from "redux-thunk";

import { LoginUser } from "../core/store/auth/authActions";

function LoginForm(props: any) {
  const dispatch = useDispatch();

  console.log("props in form", props);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  // const [error, setError] = useState(null);

  const error = props.props.state.auth.error
    ? props.props.state.auth.error
    : null;

  const handleFormSubmit = () => {
    // alert("hello ");
    dispatch(LoginUser(username, password));
    // dispatch({ type: LOGIN_USER });
  };

  return (
    <div>
      <Card style={{ backgroundColor: "whitesmoke", height: "500px" }}>
        <CardHeader title="Login" />
        <CardContent>
          <div>
            <TextField
              //   error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              //   onKeyPress={handleKeyPress}
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
              onChange={(e) => setPassword(e.target.value)}
              //   helperText={state.helperText}
              //   onChange={handlePasswordChange}
              //   onKeyPress={handleKeyPress}
            />
            <Checkbox
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              name="remember"
              color="primary"
            />{" "}
            Remember Me - Stay logged in
          </div>
          {error !== null && <Typography color="error">{error}</Typography>}
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
            Login
          </Button>
          <Link to="/forgot-password">Forgot Password? </Link>
        </CardActions>
        <CardContent>
          <div>
            Not a member? <Link to="/register">Sign Up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
