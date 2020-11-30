import React, { useEffect } from "react";

import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import { GetUserData, SetAuthenticated } from "./auth/core/redux/actions";

import { useDispatch } from "react-redux";

import Routes from "./Routes";

require("dotenv").config();

const App = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dataLocal = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    const dataSession = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    let accessToken = null;
    let refreshToken = null;

    if (dataLocal !== null) {
      accessToken = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : null;

      refreshToken = localStorage.getItem("accessToken")
        ? localStorage.getItem("accessToken")
        : null;
    } else if (dataSession !== null) {
      accessToken = sessionStorage.getItem("accessToken")
        ? sessionStorage.getItem("accessToken")
        : null;

      refreshToken = sessionStorage.getItem("accessToken")
        ? sessionStorage.getItem("accessToken")
        : null;
    }

    if (accessToken != null && refreshToken !== null) {
      const jwtToken = `Bearer ${accessToken}`;
      dispatch(SetAuthenticated(true));
      dispatch(GetUserData(jwtToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
