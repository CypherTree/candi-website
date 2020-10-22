import React from "react";
// import AuthContext from "../../context/auth/authContext";
import { Route } from "react-router-dom";

const PrivateRoute = () => {
  //   const authContext = useContext(AuthContext);

  //   const { isAuthenticated, loading } = authContext;

  return (
    <Route
    //   {...rest}
    //   render={(props) =>
    //     !isAuthenticated && !loading ? (
    //       <Redirect to="/login" />
    //     ) : (
    //       <Component {...props} />
    //     )
    //   }
    />
  );
};

export default PrivateRoute;
