import React, { Component } from "react";
import { connect } from "react-redux";
import * as dbActions from "../../store/actions/dbActions";
import "./Dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getEmployees();
  }

  onAddEmployee = () => {
    this.props.addEmployee({
      name: "gerges",
      mobile: "012",
      email: "gerges@dd.com"
    });
  };

  onDeleteEmployee = () => {
    this.props.deleteEmployee("5be2b70c2bc8510100cb485e");
  };

  onEditEmployee = () => {
    this.props.editEmployee("5be2b96080e2811cbcb20fee", { mobile: "00000000" });
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>{" "}
        <button onClick={this.onAddEmployee}>Add employee</button>
        <button onClick={this.onDeleteEmployee}>Delete employee</button>
        <button onClick={this.onEditEmployee}>Edit employee</button>
        <div>
          {" "}
          {this.props.employees.map(employee => (
            <div className="dashboard-employee-container">
              <p>{employee.name}</p>
              <p>{employee.mobile}</p>
              <p>{employee.email}</p>
            </div>
          ))}{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.db.employees
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
