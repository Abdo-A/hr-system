import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Employee from "./pages/Employee/Employee";
import Login from "./pages/Login/Login";

import "./App.css";

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            {isAuthenticated ? (
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/employee/:id" component={Employee} />
              </Switch>
            ) : (
              <Redirect to="/" />
            )}
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(App);
