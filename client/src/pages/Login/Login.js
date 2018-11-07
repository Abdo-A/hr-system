import { connect } from "react-redux";
import { Modal, Button, Input } from "antd";
import React, { Component } from "react";
import validator from "validator";

import * as dbActions from "../../store/actions/dbActions";

import "./Login.css";

const logo = require("../../assets/logo.jpg");

class Login extends Component {
  state = {
    showModal: false,
    user_name: "",
    user_email: "",
    user_password: "",
    login_user_email: "",
    login_user_password: "",
    modalSubmitError: "",
    loginError: ""
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
    if (
      this.state.user_name.length <= 2 ||
      this.state.user_password.length <= 2 ||
      !validator.isEmail(this.state.user_email)
    ) {
      this.setState(() => ({
        modalSubmitError: "Please fill the inputs properly"
      }));
      return;
    }

    for (let user of this.props.users) {
      if (this.state.user_email === user.email) {
        this.setState(() => ({
          modalSubmitError: "This email is already registered"
        }));
        return;
      }
    }

    this.setState(() => ({
      modalSubmitError: ""
    }));

    this.props.addUser({
      name: this.state.user_name,
      email: this.state.user_email,
      password: this.state.user_password
    });

    this.setState(() => ({
      modalSubmitError: "Making an account.."
    }));

    setTimeout(() => {
      this.setState({
        showModal: false
      });
    }, 1500);

    setTimeout(() => {
      this.props.getUsers();
      this.setState(() => ({
        modalSubmitError: ""
      }));
    }, 5000);
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
    if (
      this.state.login_user_password.length <= 2 ||
      !validator.isEmail(this.state.login_user_email)
    ) {
      this.setState(() => ({
        loginError: "Please fill the inputs properly"
      }));
      return;
    }

    this.setState(() => ({
      loginError: ""
    }));

    let authenticate = false;
    for (let user of this.props.users) {
      if (
        this.state.login_user_email === user.email &&
        this.state.login_user_password === user.password
      ) {
        authenticate = true;
        this.props.authenticate();
        this.props.history.replace("/dashboard");
        return;
      }
    }
    if (!authenticate) {
      this.setState(() => ({
        loginError: "Email or password are incorrect"
      }));
    }
  };

  render() {
    return (
      <div className="login-container">
        <h1 style={{ color: "#FFF" }}>Welcome to our HR system</h1>
        <a href="http://eseed.net" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="company" className="login-logo" width="200" />
        </a>

        {/* SIGN IN */}

        <div style={{ margin: "20px" }}>
          <Input
            placeholder="Email"
            name="login_user_email"
            type="email"
            onChange={this.onInputChange}
            value={this.state.login_user_email}
            style={{ width: "30vw" }}
          />
          <br />
          <br />
          <Input
            placeholder="Password"
            name="login_user_password"
            type="password"
            onChange={this.onInputChange}
            value={this.state.login_user_password}
            style={{ width: "30vw" }}
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
          <br />
          <b>{this.state.loginError}</b>
        </div>

        {/* SIGN UP */}

        <Button type="danger" onClick={this.showModal}>
          New HR Member?
        </Button>
        <Modal
          title="Sign Up"
          visible={this.state.showModal}
          closable={false}
          footer={[
            <b>{this.state.modalSubmitError} </b>,
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Sign up
            </Button>
          ]}
        >
          <label>Name</label>{" "}
          <Input
            type="text"
            name="user_name"
            value={this.state.user_name}
            onChange={this.onInputChange}
            placeholder="Name"
          />
          <br />
          <br />
          <label>Email</label>{" "}
          <Input
            type="email"
            name="user_email"
            value={this.state.user_email}
            onChange={this.onInputChange}
            placeholder="Email"
          />
          <br />
          <br />
          <label>Password</label>{" "}
          <Input
            type="password"
            name="user_password"
            value={this.state.user_password}
            onChange={this.onInputChange}
            placeholder="password"
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
