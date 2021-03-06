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
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import { LoginUser } from "../../core/redux/actions";

import { StateType } from "../../../app/core/redux/types";

type Props = {
  loginUser: (username: string, password: string, rememberMe: boolean) => void;
  auth: any;
};

const LoginForm: React.FC<Props> = ({ loginUser, auth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const error = auth.error ? auth.error : null;

  const handleFormSubmit = () => {
    loginUser(username, password, rememberMe);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Card style={{ backgroundColor: "whitesmoke", height: "500px" }}>
        <CardHeader title="Login" />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id="username"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            onClick={handleFormSubmit}
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
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    loginUser: (username: string, password: string, rememberMe: boolean) =>
      dispatch(LoginUser(username, password, rememberMe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
