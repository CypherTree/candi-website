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

import "../../../App.css";

import { connect } from "react-redux";
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Sidebar from "../sidebar/Sidebar";

const Routes = (props: any) => {
  const { accessToken } = getCurrentSessionTokens();

  // console.log("routes are working..");
  // console.log("props in routes", props);

  return (
    <>
      <Layout>
        {accessToken && <Sidebar />}
        <Layout>
          {accessToken && <Navbar />}
          <Content>
            <div className="App">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />{" "}
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
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
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Routes);
