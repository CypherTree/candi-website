import React, { useEffect } from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./containers/login/Login";

import Register from "./containers/register/Register";

import PrivateRoute from "./components/routing/PrivateRoute";

import Dashboard from "./containers/dashboard/Dashboard";

import { GetUserData, SetAuthenticated } from "./core/store/auth/actions";

import { useDispatch } from "react-redux";

import PageNotFound from "./containers/pagenotfound/PageNotFound";

import ForgotPassword from "./containers/forgotPassword/ForgotPassword";

import ResetPassword from "./containers/forgotPassword/ResetPassword";

require("dotenv").config();

const App = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dataLocal = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    const dataSession = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    let accessToken = null;
    let refreshToken = null;

    if (dataLocal !== null) {
      accessToken = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : null;

      refreshToken = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : null;
    } else if (dataSession !== null) {
      accessToken = sessionStorage.getItem("accessToken")
        ? sessionStorage.getItem("accessToken")
        : null;

      refreshToken = sessionStorage.getItem("accessToken")
        ? sessionStorage.getItem("accessToken")
        : null;
    }

    if (accessToken != null && refreshToken !== null) {
      const jwtToken = `Bearer ${accessToken}`;
      dispatch(SetAuthenticated(true));
      dispatch(GetUserData(jwtToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
