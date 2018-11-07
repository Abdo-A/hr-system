import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Spin, DatePicker, Input } from "antd";
import moment from "moment";
import React, { Component } from "react";
import validator from "validator";

import * as dbActions from "../../store/actions/dbActions";

import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    showModal: false,
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_hire_date: "",
    modalSubmitError: ""
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
    let employer_hire_date = this.state.employee_hire_date;
    if (!employer_hire_date) {
      employer_hire_date = moment().format("L");
    }

    if (
      this.state.employee_name.length <= 2 ||
      this.state.employee_mobile.length <= 2 ||
      !validator.isEmail(this.state.employee_email)
    ) {
      this.setState(() => ({
        modalSubmitError: "Please fill the inputs properly"
      }));
      return;
    }

    for (let employee of this.props.employees) {
      if (this.state.employee_email === employee.email) {
        this.setState(() => ({
          modalSubmitError: "There is an employee with the same email"
        }));
        return;
      }
    }

    this.setState(() => ({
      modalSubmitError: ""
    }));

    this.props.addEmployee({
      name: this.state.employee_name,
      email: this.state.employee_email,
      mobile: this.state.employee_mobile,
      hireDate: employer_hire_date
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

  onMobileInputChange = e => {
    if (!isNaN(e.target.value))
      this.setState({
        employee_mobile: e.target.value
      });
  };

  onDateInputChange = e => {
    this.setState(() => ({
      employee_hire_date: e.format("L")
    }));
  };

  onSignOut = () => {
    this.props.unauthenticate();
    this.props.history.push("/");
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={this.onSignOut}>Sign Out</Button>
        </div>
        {/* Adding an employee */}
        <Button type="primary" onClick={this.showModal}>
          Add Employee
        </Button>
        <Modal
          title="Add Employee"
          visible={this.state.showModal}
          closable={false}
          footer={[
            <b>{this.state.modalSubmitError} </b>,
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Add
            </Button>
          ]}
        >
          <label>Name</label>{" "}
          <Input
            type="text"
            name="employee_name"
            value={this.state.employee_name}
            onChange={this.onInputChange}
            placeholder="Name"
          />
          <br />
          <br />
          <label>Email</label>{" "}
          <Input
            type="text"
            name="employee_email"
            value={this.state.employee_email}
            onChange={this.onInputChange}
            placeholder="Email"
          />
          <br />
          <br />
          <label>Mobile</label>{" "}
          <Input
            type="text"
            name="employee_mobile"
            value={this.state.employee_mobile}
            onChange={this.onMobileInputChange}
            placeholder="Mobile Number"
          />
          <br />
          <br />
          <label>Hire Date</label>{" "}
          <DatePicker
            defaultValue={moment()}
            onChange={this.onDateInputChange}
            allowClear={false}
          />
          <br />
        </Modal>

        <div>
          {this.props.employees && this.props.employees.length > 0
            ? this.props.employees.map((employee, i) => {
                if (i === 0) {
                  return (
                    <div key={employee._id}>
                      <div className="dashboard-employee-container-main">
                        <p>Name</p>
                        <p>Mobile Phone</p>
                        <p>Email</p>
                        <p>Hire Date</p>
                      </div>

                      <Link to={`/employee/${employee._id}`}>
                        <div className="dashboard-employee-container">
                          <p>{employee.name}</p>
                          <p>{employee.mobile}</p>
                          <p>{employee.email}</p>
                          <p>{moment(employee.hireDate).format("L")}</p>
                        </div>
                      </Link>
                    </div>
                  );
                } else
                  return (
                    <Link to={`/employee/${employee._id}`} key={employee._id}>
                      <div className="dashboard-employee-container">
                        <p>{employee.name}</p>
                        <p>{employee.mobile}</p>
                        <p>{employee.email}</p>
                        <p>{moment(employee.hireDate).format("L")}</p>
                      </div>
                    </Link>
                  );
              })
            : "No Employees yet"}
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
    editEmployee: dbActions.editEmployee,
    unauthenticate: dbActions.unauthenticate
  }
)(Dashboard);
