import React, { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setLoggedInUser } from "./auth/core/services/login";

import "./App.css";

import Routes from "./app/components/routing/Routes";

require("dotenv").config();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setLoggedInUser(dispatch);
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
