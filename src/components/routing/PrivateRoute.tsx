import React from "react";
// import AuthContext from "../../context/auth/authContext";
// import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const PrivateRoute = (props: any) => {
  console.log("isAuthenticated in private ", props.state.auth);

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

export default connect(mapStateToProps)(PrivateRoute);
