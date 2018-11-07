import axios from "axios";

import * as actionTypes from "./actionTypes";

export const getEmployees = () => dispatch => {
  dispatch(setLoading());

  axios.get("/api/employees/getEmployees").then(res => {
    dispatch({
      type: actionTypes.GET_EMPLOYEES,
      employees: res.data
    });

    console.log("from getEmployees", res.data);
  });
};

export const getEmployee = id => dispatch => {
  dispatch(setLoading());
  axios.get("/api/employees/getEmployee/" + id).then(res => {
    dispatch({
      type: actionTypes.GET_EMPLOYEE,
      currentEmployee: res.data
    });
    console.log("from getEmployee", res.data);
  });
};

export const addEmployee = employee => dispatch => {
  dispatch(setLoading());
  axios.post("/api/employees/addEmployee", employee).then(res => {
    dispatch({
      type: actionTypes.ADD_EMPLOYEE,
      employee: employee
    });
    dispatch(getEmployees());
  });
};

export const deleteEmployee = id => dispatch => {
  dispatch(setLoading());
  axios.delete("/api/employees/deleteEmployee/" + id).then(res => {
    dispatch({
      type: actionTypes.DELETE_EMPLOYEE
    });
    dispatch(getEmployees());
  });
};

export const editEmployee = (id, changes) => dispatch => {
  //'changes' is an object
  dispatch(setLoading());
  axios.put("/api/employees/updateEmployee/" + id, changes).then(res => {
    dispatch({
      type: actionTypes.EDIT_EMPLOYEE,
      employee: res.data
    });
    //dispatch(getEmployees());
  });
};

export const getUsers = () => dispatch => {
  dispatch(setLoading());

  axios.get("/api/users/getUsers").then(res => {
    dispatch({
      type: actionTypes.GET_USERS,
      users: res.data
    });

    console.log("from getEmployees", res.data);
  });
};

export const addUser = user => dispatch => {
  dispatch(setLoading());
  axios.post("/api/users/addUser", user).then(res => {
    dispatch({
      type: actionTypes.ADD_USER,
      user: user
    });
  });
};

const setLoading = () => {
  return {
    type: actionTypes.LOADING_START
  };
};
