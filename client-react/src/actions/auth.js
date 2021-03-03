import jwtDecode from 'jwt-decode';

import { CLEAR_AUTH, SET_AUTH, SET_AUTH_ERROR } from './types';
import axios from '../axios';

let logoutSetTimeoutId;

export const register = ({ emailAddress, password, confirmPassword }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/auth/register', {
        emailAddress,
        password,
        confirmPassword,
      });
      const token = response.data.token.split(' ')[1];
      addTokenToLocalStorage(token);
      const decoded = jwtDecode(token);
      dispatch(setAuth(decoded.emailAddress));
    } catch (err) {
      dispatch({
        type: SET_AUTH_ERROR,
        payload: {
          error: err,
        },
      });
    }
  };
};

export const login = ({ emailAddress, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/auth/login', {
        emailAddress,
        password,
      });
      const token = response.data.token.split(' ')[1];
      addTokenToLocalStorage(token);
      const decoded = jwtDecode(token);
      dispatch(setAuth(decoded.emailAddress));
    } catch (err) {
      dispatch({
        type: SET_AUTH_ERROR,
        payload: {
          error: err,
        },
      });
    }
  };
};

export const logout = () => {
  clearTimeout(logoutSetTimeoutId);
  clearTokenFromLocalStorage();
  return {
    type: CLEAR_AUTH,
  };
};

export function setAuth(emailAddress) {
  return {
    type: SET_AUTH,
    payload: {
      isAuth: emailAddress ? true : false,
      emailAddress: emailAddress,
    },
  };
}

const addTokenToLocalStorage = (token) => {
  localStorage.setItem('tokenID', token);
  const { iat, exp } = jwtDecode(token);
  const tokenDuration = (exp - iat) * 1000;
  logoutSetTimeoutId = setTimeout(() => {
    clearTokenFromLocalStorage();
  }, tokenDuration);
};

const clearTokenFromLocalStorage = () => {
  localStorage.removeItem('tokenID');
};
