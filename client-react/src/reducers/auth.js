import { CLEAR_AUTH, SET_AUTH, SET_AUTH_ERROR } from '../actions/types';

const initialState = {
  isAuth: false,
  emailAddress: null,
  error: null,
  isAdmin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        isAdmin: action.payload.isAdmin,
        emailAddress: action.payload.emailAddress,
        error: null,
      };
    case CLEAR_AUTH:
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        emailAddress: null,
        error: null,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
