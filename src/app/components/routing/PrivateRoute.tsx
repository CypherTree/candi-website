import React from "react";

import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Dashboard from "../../containers/dashboard/Dashboard";

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const PrivateRoute = (props: any) => {
  const { component: Component, ...rest } = props;

  const { isAuthenticated } = props.state.auth;
  let privacyPolicyAccepted = false;

  if (
    props.state.auth &&
    props.state.auth.userData &&
    props.state.auth.userData.privacy_policy_accepted
  ) {
    privacyPolicyAccepted = true;
  } else {
    privacyPolicyAccepted = false;
  }

  console.log("props in privacy ....", props);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : privacyPolicyAccepted ? (
          <Component {...props} />
        ) : (
          <Dashboard />
          // <Redirect to={props.location.pathname} />
          // <Organisations />
        )
      }
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);
