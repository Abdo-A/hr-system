import { connect } from "react-redux";

import {
  Modal,
  Button,
  Card,
  Spin,
  InputNumber,
  Select,
  DatePicker
} from "antd";

import moment from "moment";
import React, { Component } from "react";

import * as dbActions from "../../store/actions/dbActions";

import "./Employee.css";

const Option = Select.Option;

class Employee extends Component {
  state = {
    showModal: false,
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_hire_date: "",
    attendence_working_hours: 8,
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
    let attendence_day = this.state.attendence_day;
    if (!attendence_day) {
      attendence_day = moment().format("L");
    }

    let attendence_working_hours = this.state.attendence_working_hours;
    if (!attendence_working_hours) {
      attendence_working_hours = 8;
    }

    let attendence_status = this.state.attendence_status;
    if (!attendence_status) {
      attendence_status = "Present";
    }

    this.props.addEmployeeAttendence(this.props.employee._id, {
      workingHours: attendence_working_hours,
      status: attendence_status,
      day: attendence_day
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
    this.setState({
      employee_hire_date: e.format("L")
    });
  };

  onAttendenceDateInputChange = e => {
    this.setState({
      attendence_day: e.format("L")
    });
  };

  handleAttendenceStatusChange = e => {
    this.setState({
      attendence_status: e
    });
  };

  handleAttendenceWorkingHoursChange = e => {
    if (!isNaN(e))
      this.setState({
        attendence_working_hours: e
      });
  };

  render() {
    if (this.props.loading || !this.props.employee) {
      return (
        <div className="spin">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div style={{ paddingTop: "50px" }}>
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
            title="Edit Employee"
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

          <Card
            style={{ margin: "20px 20px" }}
            title="Add a new Attendence Record for this Employee"
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <label>Day</label>{" "}
                <DatePicker
                  defaultValue={moment()}
                  onChange={this.onAttendenceDateInputChange}
                  allowClear={false}
                />
              </div>

              <div>
                <label>Working hours</label>{" "}
                <InputNumber
                  min={0}
                  max={15}
                  defaultValue={8}
                  onChange={this.handleAttendenceWorkingHoursChange}
                  formatter={value => this.state.attendence_working_hours}
                />
              </div>

              <div>
                <label>Status</label>{" "}
                <Select
                  defaultValue="Present"
                  style={{ width: 120 }}
                  onChange={this.handleAttendenceStatusChange}
                >
                  <Option value="Present">Present</Option>
                  <Option value="Absent">Absent</Option>
                  <Option value="Sick Leave">Sick Leave</Option>
                  <Option value="Day Off">Day Off</Option>
                </Select>
              </div>
              <Button type="primary" onClick={this.onAddAttendenceRecord}>
                Add Attendence Record
              </Button>
            </div>
          </Card>

          <h2>Attendence Records:</h2>
          {this.props.employee.attendenceRecord.length <= 0
            ? "No Records yet for this employee"
            : this.props.employee.attendenceRecord.map((att, i) => {
                if (i === 0)
                  return (
                    <div key={att._id}>
                      <div className="employee-attendence-record-container-main">
                        <div>Day</div>
                        <div>Working Hours</div>
                        <div>Status</div>
                      </div>
                      <div className="employee-attendence-record-container">
                        <div>{moment(att.day).format("L")}</div>
                        <div>{att.workingHours}</div>
                        <div>{att.status}</div>
                      </div>
                    </div>
                  );
                else
                  return (
                    <div
                      key={att._id}
                      className="employee-attendence-record-container"
                    >
                      <div>{moment(att.day).format("L")}</div>
                      <div>{att.workingHours}</div>
                      <div>{att.status}</div>
                    </div>
                  );
              })}
        </div>
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
