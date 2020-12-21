import React from "react";

import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const { ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props: any) => {
        const { component: Component } = props;
        const { isAuthenticated } = props.state.auth;

        return !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
