import React from "react";

import { Route, Switch } from "react-router-dom";

import Login from "../../../auth/containers/login/Login";

import Register from "../../../auth/containers/register/Register";

import PrivateRoute from "./PrivateRoute";

import Dashboard from "../../containers/dashboard/Dashboard";

import PageNotFound from "../../containers/pagenotfound/PageNotFound";

import ForgotPassword from "../../../auth/containers/forgotPassword/ForgotPassword";

import ResetPassword from "../../../auth/containers/forgotPassword/ResetPassword";

import NewOrganisation from "../../containers/neworganization/NewOrganisation";

import Organisations from "../../containers/organisations/Organisations";

import EmailVerificationPage from "../../../auth/containers/emailVerification/EmailVerificationPage";

import Navbar from "../navbar/Navbar";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

const Routes = () => {
  const { accessToken } = getCurrentSessionTokens();

  return (
    <>
      {accessToken && <Navbar />}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />{" "}
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset" component={ResetPassword} />
        <Route
          exact
          path="/email-verification"
          component={EmailVerificationPage}
        />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/organisation/new"
          component={NewOrganisation}
        />
        <PrivateRoute
          exact
          path="/organisations/all"
          component={Organisations}
        />
        <PrivateRoute exact path="/dashboard2" component={Register} />
        <Route component={PageNotFound} />
        {/* <Route exact path="/privacy" component={PrivacyPolicy} /> */}
      </Switch>
    </>
  );
};

export default Routes;
