import React, { useState, useEffect } from "react";

import Layout, { Content } from "antd/lib/layout/layout";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import EmailVerificationPage from "../../../auth/containers/emailVerification/EmailVerificationPage";
import ForgotPassword from "../../../auth/containers/forgotPassword/ForgotPassword";
import Login from "../../../auth/containers/login/Login";
import Register from "../../../auth/containers/register/Register";
import ResetPassword from "../../../auth/containers/forgotPassword/ResetPassword";

import { getCurrentSessionTokens } from "../../../auth/core/services/session";

import "../../../App.css";

import Dashboard from "../../containers/dashboard/Dashboard";
import NewOrganisation from "../../containers/neworganization/NewOrganisation";
import Organisations from "../../containers/organisations/Organisations";
import PageNotFound from "../../containers/pagenotfound/PageNotFound";

import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import PrivateRoute from "./PrivateRoute";
import People from "../../containers/people/People";

import { useLocation } from "react-router-dom";
import OrganisationDetailsPage from "../../containers/settings/OrganisationDetailsPage";
import CompanyDetailsPage from "../../containers/settings/CompanyDetailsPage";
import PlanDetailsPage from "../../containers/settings/PlanDetailsPage";
import RolesDetailsPage from "../../containers/settings/RolesDetailsPage";
import InviteLanding from "../../containers/invite/InviteLanding";
import ViewIncomingInvites from "../../containers/invite/ViewIncomingInvites";
// import SettingsOrgDetails from "../settingOrgDetails/SettingsOrgDetails";

const Routes = (props: any) => {
  console.log("props in routes ----->", props);

  const location = useLocation();
  console.log(location);

  const [tenant, setTenant] = useState<string | undefined>();

  const getTenantInfo = () => {
    console.log(window.location.href); //yields: "https://stacksnippets.net/js"

    const location = window.location.href;

    const result = location.split(".");

    const first = result.shift();

    const tenent = first?.split("://");

    const last = tenent?.pop();

    // console.log("----> the tenant recieved is ----> ", last);

    return last;
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { accessToken } = getCurrentSessionTokens();

  const { isAuthenticated } = props.state.auth;

  const returnMargin = () => {
    if (isAuthenticated) {
      if (collapsed) {
        return "80px";
      } else {
        return "200px";
      }
    } else {
      return "0px";
    }
  };

  const ReturnHello = () => {
    return <Redirect to="/organisations/all" />;
  };

  useEffect(() => {
    const ten = getTenantInfo();
    console.log("hello world .... ", ten);
    setTenant(ten);
  }, []);

  return (
    <>
      <div>
        {accessToken && (
          <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        )}
      </div>

      <div style={{ flex: 1 }}>
        <Layout
          style={{
            marginLeft: returnMargin(),
          }}
        >
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
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={Dashboard}
                  tenant={getTenantInfo()}
                />
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
                <PrivateRoute
                  exact
                  path="/organisations"
                  component={ReturnHello}
                />
                <PrivateRoute exact path="/people" component={People} />
                <Route
                  // exact
                  path="/settings/org"
                  component={OrganisationDetailsPage}
                />
                <Route
                  // exact
                  path="/settings/company"
                  component={CompanyDetailsPage}
                />
                <Route
                  // exact
                  path="/settings/plan"
                  component={PlanDetailsPage}
                />
                <Route
                  // exact
                  path="/org/roles"
                  component={RolesDetailsPage}
                />
                <Route
                  // exact
                  path="/team/invite"
                  component={InviteLanding}
                />
                <Route
                  // exact
                  path="/invites/all"
                  component={ViewIncomingInvites}
                />
                <Route component={PageNotFound} />
                {/* <Route component={InviteLanding} /> */}
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Routes);
