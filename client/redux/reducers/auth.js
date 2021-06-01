import { LOGIN, SIGNUP, LOGOUT } from "../actions/types";

const initialState = {
  token: null,
  accountId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        token: action.payload.token,
        accountId: action.payload.accountId,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
