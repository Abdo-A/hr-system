import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import React, { Component } from "react";

import Dashboard from "./pages/Dashboard/Dashboard";
import Employee from "./pages/Employee/Employee";
import Login from "./pages/Login/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/employee/:id" component={Employee} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
