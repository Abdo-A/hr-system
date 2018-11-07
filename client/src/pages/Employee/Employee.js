import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { Spin } from "antd";
import React, { Component } from "react";

import * as dbActions from "../../store/actions/dbActions";

import "./Employee.css";

class Employee extends Component {
  state = {
    showModal: false,
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_hire_date: ""
  };

  componentDidMount() {
    this.props.getEmployee(this.props.match.params.id);
  }

  showModal = () => {
    this.setState({
      showModal: true
    });

    this.setState(() => ({
      employee_name: this.props.employee.name,
      employee_email: this.props.employee.email,
      employee_mobile: this.props.employee.mobile,
      employee_hire_date: this.props.employee.date
    }));
  };

  handleOk = e => {
    this.props.editEmployee(this.props.employee._id, {
      name: this.state.employee_name,
      email: this.state.employee_email,
      mobile: this.state.employee_mobile,
      hireDate: this.state.employee_hire_date
    });

    this.setState({
      showModal: false
    });

    this.props.getEmployee(this.props.match.params.id);
  };

  handleCancel = e => {
    this.setState({
      showModal: false
    });
  };

  deleteEmployee = () => {
    this.props.deleteEmployee(this.props.employee._id);
    this.props.history.replace("/dashboard");
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.props.loading) {
      return (
        <div className="spin">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div style={{ paddingTop: "50px" }}>
        {this.props.employee ? (
          <div>
            <h1>{this.props.employee.name}</h1>
            <h2>Employer email: {this.props.employee.email}</h2>
            <h2>Employer mobile: {this.props.employee.mobile}</h2>
            <h2>Employer hire date: {this.props.employee.hireDate}</h2>

            {/* Buttons */}
            <Button onClick={this.deleteEmployee} type="primary">
              Delete Employee
            </Button>
            <br />
            <br />
            <Button type="primary" onClick={this.showModal}>
              Edit Employee
            </Button>
            <Modal
              title="Basic Modal"
              visible={this.state.showModal}
              closable={false}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Edit
                </Button>
              ]}
            >
              <label>Name</label>{" "}
              <input
                type="text"
                name="employee_name"
                value={this.state.employee_name}
                onChange={this.onInputChange}
              />
              <br />
              <br />
              <label>Email</label>{" "}
              <input
                type="text"
                name="employee_email"
                value={this.state.employee_email}
                onChange={this.onInputChange}
              />
              <br />
              <br />
              <label>Mobile</label>{" "}
              <input
                type="text"
                name="employee_mobile"
                value={this.state.employee_mobile}
                onChange={this.onInputChange}
              />
              <br />
              <br />
              <label>Hire Date</label>{" "}
              <input
                type="date"
                name="employee_hire_date"
                value={this.state.employee_hire_date}
                onChange={this.onInputChange}
              />
              <br />
            </Modal>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employee: state.db.currentEmployee
  };
};

export default connect(
  mapStateToProps,
  {
    getEmployee: dbActions.getEmployee,
    deleteEmployee: dbActions.deleteEmployee,
    editEmployee: dbActions.editEmployee
  }
)(Employee);
