import React, { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { setLoggedInUser } from "./auth/core/services/login";
import Routes from "./app/components/routing/Routes";

import "antd/dist/antd.css";
import "./index.css";

require("dotenv").config();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setLoggedInUser(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Routes />
      <ToastContainer />
    </Router>
  );
};

export default App;
