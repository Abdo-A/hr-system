import { connect } from "react-redux";
import { DatePicker } from "antd";
import { Modal, Button, Card } from "antd";
import { Spin } from "antd";
import moment from "moment";
import React, { Component } from "react";

import * as dbActions from "../../store/actions/dbActions";

import "./Employee.css";

class Employee extends Component {
  state = {
    showModal: false,
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_hire_date: "",
    attendence_working_hours: "",
    attendence_day: "",
    attendence_status: ""
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
      employee_hire_date: new Date(this.props.employee.hireDate)
    }));
  };

  handleOk = e => {
    let employer_hire_date = this.state.employee_hire_date;
    if (!employer_hire_date) {
      employer_hire_date = moment().format("L");
    }

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

  onAddAttendenceRecord = () => {
    console.log(
      this.state.attendence_day,
      this.state.attendence_status,
      this.state.attendence_working_hours
    );

    this.props.addEmployeeAttendence(this.props.employee._id, {
      workingHours: this.state.attendence_working_hours,
      status: this.state.attendence_status,
      day: this.state.attendence_day
    });

    this.props.getEmployee(this.props.match.params.id);
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

  onDateInputChange = e => {
    this.setState(() => ({
      employee_hire_date: e.format("L")
    }));
  };

  onAttendenceDateInputChange = e => {
    this.setState(() => ({
      attendence_day: e.format("L")
    }));
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
            <h2>
              Employer hire date:{" "}
              {moment(this.props.employee.hireDate).format("L")}
            </h2>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/* DELETE EMPLOYEE */}
              <Button onClick={this.deleteEmployee} type="primary">
                Delete Employee
              </Button>

              {/* EDIT EMPLOYEE */}
              <Button type="primary" onClick={this.showModal}>
                Edit Employee
              </Button>
            </div>

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
              <DatePicker
                defaultValue={moment(this.state.employee_hire_date)}
                onChange={this.onDateInputChange}
                allowClear={false}
              />
              <br />
            </Modal>

            {/* ADD EMPLOYEE ATTENDENCE */}

            <Card style={{ margin: "20px 20px" }}>
              <label>Day</label>
              <DatePicker
                defaultValue={moment()}
                onChange={this.onAttendenceDateInputChange}
                allowClear={false}
              />

              <label>Working hours</label>
              <input
                type="number"
                name="attendence_working_hours"
                value={this.state.attendence_working_hours}
                onChange={this.onInputChange}
              />

              <label>Status</label>
              <input
                type="text"
                name="attendence_status"
                value={this.state.attendence_status}
                onChange={this.onInputChange}
              />

              <Button type="primary" onClick={this.onAddAttendenceRecord}>
                Add Attendence Record
              </Button>
            </Card>

            <h2>Attendence Record:</h2>
            {this.props.employee.attendenceRecord.length <= 0
              ? "No Records yet for this employee"
              : "has ass"}
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
    employee: state.db.currentEmployee,
    loading: state.db.loading
  };
};

export default connect(
  mapStateToProps,
  {
    getEmployee: dbActions.getEmployee,
    addEmployeeAttendence: dbActions.addEmployeeAttendence,
    deleteEmployee: dbActions.deleteEmployee,
    editEmployee: dbActions.editEmployee
  }
)(Employee);
