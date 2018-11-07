import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  employees: []
};

const dbReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees
      };

    case actionTypes.ADD_EMPLOYEE:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default dbReducer;
