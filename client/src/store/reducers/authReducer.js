const INITIAL_STATE = {
  isAuthenticated: true
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "":
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducer;
