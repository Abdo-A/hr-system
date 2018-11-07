import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { Spin } from "antd";
import React, { Component } from "react";

import * as dbActions from "../../store/actions/dbActions";

import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    showModal: false,
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_hire_date: ""
  };

  componentDidMount() {
    this.props.getEmployees();
  }

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
    if (this.props.loading) {
      return (
        <div className="spin">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div>
        <h1 className="dashboard-header">Dashboard</h1>
        {/* Adding an employee */}
        <Button type="primary" onClick={this.showModal}>
          Add Employee
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
              Add
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

        <div>
          {this.props.employees ? (
            this.props.employees.map(employee => {
              return (
                <Link to={`/employee/${employee._id}`} key={employee._id}>
                  <div className="dashboard-employee-container">
                    <p>{employee.name}</p>
                    <p>{employee.mobile}</p>
                    <p>{employee.email}</p>
                    <p>{employee.hireDate}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="spin">
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.db.employees,
    loading: state.db.loading
  };
};

export default connect(
  mapStateToProps,
  {
    getEmployees: dbActions.getEmployees,
    addEmployee: dbActions.addEmployee,
    deleteEmployee: dbActions.deleteEmployee,
    editEmployee: dbActions.editEmployee
  }
)(Dashboard);
