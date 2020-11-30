import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./auth/containers/login/Login";

import Register from "./auth/containers/register/Register";

import PrivateRoute from "./app/components/routing/PrivateRoute";

import Dashboard from "./app/containers/dashboard/Dashboard";

import PageNotFound from "./app/containers/pagenotfound/PageNotFound";

import ForgotPassword from "./auth/containers/forgotPassword/ForgotPassword";

import ResetPassword from "./auth/containers/forgotPassword/ResetPassword";

const Routes = () => {
  return (
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
  );
};

export default Routes;
