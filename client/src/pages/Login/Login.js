import { Button } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import Dashboard from "../Dashboard/Dashboard";

const logo = require("../../assets/logo.jpg");
export default class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <h1 style={{ color: "#FFF" }}>Welcome to our HR system</h1>
        <img src={logo} alt="company" className="login-logo" width="200" />
        <div>
          <Link to="/dashboard">
            <Button type="primary" block style={{ width: "200px" }}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
