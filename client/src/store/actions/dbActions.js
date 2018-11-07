import axios from "axios";

import * as actionTypes from "./actionTypes";

export const getEmployees = () => dispatch => {
  axios.get("/api/employees/getEmployees").then(res => {
    dispatch({
      type: actionTypes.GET_EMPLOYEES,
      employees: res.data
    });
    console.log("from getEmployees", res.data);
  });
};

export const addEmployee = employee => dispatch => {
  axios.post("/api/employees/addEmployee", employee).then(res => {
    dispatch({
      type: actionTypes.ADD_EMPLOYEE,
      employee: employee
    });
    dispatch(getEmployees());
  });
};

export const deleteEmployee = id => dispatch => {
  axios.delete("/api/employees/deleteEmployee/" + id).then(res => {
    dispatch({
      type: actionTypes.DELETE_EMPLOYEE
    });
    dispatch(getEmployees());
  });
};

export const editEmployee = (id, changes) => dispatch => {
  //'changes' is an object
  axios.put("/api/employees/updateEmployee/" + id, changes).then(res => {
    dispatch({
      type: actionTypes.EDIT_EMPLOYEE,
      employee: res.data
    });
    dispatch(getEmployees());
  });
};
