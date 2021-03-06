import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  employees: [],
  users: [],
  currentEmployee: null,
  loading: false,
  isAuthenticated: false
};

const dbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
        currentEmployee: null,
        loading: false
      };

    case actionTypes.GET_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.currentEmployee,
        loading: false
      };

    case actionTypes.ADD_EMPLOYEE:
      return {
        ...state,
        loading: false
      };

    case actionTypes.ADD_EMPLOYEE_ATTENDENCE:
      return {
        ...state,
        loading: false,
        currentEmployee: action.employee
      };

    case actionTypes.EDIT_EMPLOYEE:
      return {
        ...state,
        loading: false
      };

    case actionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        loading: false
      };

    case actionTypes.LOADING_START:
      return {
        loading: true
      };

    case actionTypes.GET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false
      };

    case actionTypes.ADD_USER:
      return {
        ...state,
        loading: false
      };

    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true
      };

    case actionTypes.UNAUTHENTICATE:
      return {
        ...state,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default dbReducer;
