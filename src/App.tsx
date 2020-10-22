import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import { Home } from "./Pages";
import Login from "./containers/login/Login";
import Button from "@material-ui/core/Button";

import Register from "./containers/register/Register";

// import history from "history";
// TODO: Add history

import PageNotFound from "./containers/pagenotfound/PageNotFound";

// import { Provider, connect } from "react-redux";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Button>
            <Link to="/">Home</Link>
          </Button>

          <Button>
            <Link to="/login">Login</Link>
          </Button>
          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </nav>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
