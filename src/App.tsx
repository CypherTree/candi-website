import React, { useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Home } from "./Pages";
import Login from "./containers/login/Login";

import Register from "./containers/register/Register";

import PrivateRoute from "./components/routing/PrivateRoute";

import Dashboard from "./containers/dashboard/Dashboard";

import { GetUserData, SetAuthenticated } from "./core/store/auth/authActions";

// import history from "history";
// TODO: Add history
import { useDispatch } from "react-redux";

import PageNotFound from "./containers/pagenotfound/PageNotFound";

import ForgotPassword from "./containers/forgotPassword/ForgotPassword";

import ResetPassword from "./containers/forgotPassword/ResetPassword";
// import PrivateRoute from "./components/routing/PrivateRoute";

// import { Provider, connect } from "react-redux";

require("dotenv").config();

const App = (props: any) => {
  console.log("_----------------- Process env -----------------", process.env);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    console.log("----------- data is ", data);

    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    const refreshToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    if (data !== null && accessToken != null && refreshToken !== null) {
      // check token expiry

      const jwtToken = `Bearer ${accessToken}`;
      dispatch(SetAuthenticated(true));
      dispatch(GetUserData(jwtToken));

      // TODO: Check this
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />{" "}
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset" component={ResetPassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard2" component={Register} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
