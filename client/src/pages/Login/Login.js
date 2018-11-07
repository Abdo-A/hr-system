import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import React, { Component } from "react";

import Dashboard from "../Dashboard/Dashboard";

import "./Login.css";

const logo = require("../../assets/logo.jpg");
export default class Login extends Component {
  state = {
    showModal: false,
    user_name: "",
    user_email: "",
    user_password: ""
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleOk = e => {
    this.props.addEmployee({
      name: this.state.employee_name,
      email: this.state.employee_email,
      mobile: this.state.employee_mobile,
      hireDate: this.state.employee_hire_date
    });

    this.setState({
      showModal: false
    });
  };

  handleCancel = e => {
    this.setState({
      showModal: false
    });
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="login-container">
        <h1 style={{ color: "#FFF" }}>Welcome to our HR system</h1>
        <img src={logo} alt="company" className="login-logo" width="200" />

        <div style={{ margin: "20px" }}>
          <input type="email" />
          <br />
          <br />
          <input type="password" />
        </div>

        <div style={{ margin: "20px" }}>
          <Link to="/dashboard">
            <Button type="primary" block style={{ width: "200px" }}>
              Login
            </Button>
          </Link>
        </div>

        {/* SIGN UP */}

        {/* Adding an employee */}
        <Button type="primary" onClick={this.showModal}>
          New HR Member?
        </Button>
        <Modal
          title="Sign Up"
          visible={this.state.showModal}
          closable={false}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Sign up
            </Button>
          ]}
        >
          <label>Name</label>{" "}
          <input
            type="text"
            name="user_name"
            value={this.state.user_name}
            onChange={this.onInputChange}
          />
          <br />
          <br />
          <label>Email</label>{" "}
          <input
            type="email"
            name="user_email"
            value={this.state.user_email}
            onChange={this.onInputChange}
          />
          <br />
          <br />
          <label>Password</label>{" "}
          <input
            type="password"
            name="user_password"
            value={this.state.user_password}
            onChange={this.onInputChange}
          />
          <br />
        </Modal>
      </div>
    );
  }
}
