import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import React, { Component } from "react";

import * as dbActions from "../../store/actions/dbActions";
import Dashboard from "../Dashboard/Dashboard";

import "./Login.css";

const logo = require("../../assets/logo.jpg");

class Login extends Component {
  state = {
    showModal: false,
    user_name: "",
    user_email: "",
    user_password: "",
    login_user_email: "",
    login_user_password: ""
  };

  componentDidMount() {
    this.props.getUsers();
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleOk = e => {
    this.props.addUser({
      name: this.state.user_name,
      email: this.state.user_email,
      password: this.state.user_password
    });

    setTimeout(() => {
      this.props.getUsers();
    }, 5000);

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

  onLogin = () => {
    // let authenticate = false;
    // console.log(this.state.login_user_email, this.state.login_user_password);
    // for (let user of this.props.users) {
    //   if (
    //     this.state.login_user_email === user.email &&
    //     this.state.login_user_password === user.password
    //   ) {
    //     authenticate = true;
    //     this.props.authenticate();
    //     this.props.history.replace("/dashboard");
    //   }
    // }
    this.props.authenticate();
    this.props.history.replace("/dashboard");
  };

  render() {
    return (
      <div className="login-container">
        <h1 style={{ color: "#FFF" }}>Welcome to our HR system</h1>
        <a href="http://eseed.net" target="_blank">
          <img src={logo} alt="company" className="login-logo" width="200" />
        </a>

        {/* SIGN IN */}

        <div style={{ margin: "20px" }}>
          <input
            type="email"
            name="login_user_email"
            onChange={this.onInputChange}
            value={this.state.login_user_email}
            style={{ color: "#888" }}
          />
          <br />
          <br />
          <input
            type="password"
            name="login_user_password"
            onChange={this.onInputChange}
            value={this.state.login_user_password}
            style={{ color: "#888" }}
          />
        </div>

        <div style={{ margin: "20px" }}>
          <Button
            type="primary"
            block
            style={{ width: "200px" }}
            onClick={this.onLogin}
          >
            Login
          </Button>
        </div>

        {/* SIGN UP */}

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

const mapStateToProps = state => {
  return {
    users: state.db.users,
    loading: state.db.loading,
    isAuthenticated: state.db.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  {
    addUser: dbActions.addUser,
    getUsers: dbActions.getUsers,
    authenticate: dbActions.authenticate
  }
)(Login);
