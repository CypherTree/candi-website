import React from "react";

import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const { component: Component, ...rest } = props;

  const { isAuthenticated } = props.state.auth;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
