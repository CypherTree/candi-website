import React, { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { setLoggedInUser } from "./auth/core/services/login";
import Routes from "./app/components/routing/Routes";

import "antd/dist/antd.css";
import "./index.css";
import axios from "axios";
import { getCurrentSessionTokens } from "./auth/core/services/session";
import getNewAccessToken from "./auth/core/services/refreshToken";

require("dotenv").config();

axios.interceptors.request.use((req) => {
  // console.log(`AXIOS CALL : ${req.method} ${req.url}`);

  // Important: request interceptors **must** return the request.
  return req;
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      console.log("calling refresh token");

      const { refreshToken } = getCurrentSessionTokens();

      if (refreshToken) {
        console.log("requested refresh token ", refreshToken);
        getNewAccessToken(refreshToken);
      }
    }
    if (err.response.status === 403) {
      toast.error("You do not have permissions to perform this action.");
      return;
    }
    throw err;
  }
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setLoggedInUser(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Routes />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
