import jwtDecode from 'jwt-decode';

import {
  CLEAR_AUTH,
  SET_AUTH,
  SET_AUTH_ERROR,
  CLEAR_LOADING,
  SET_LOADING,
} from './types';
import axios from '../axios';

let logoutSetTimeoutId;

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const clearLoading = () => {
  return {
    type: CLEAR_LOADING,
  };
};

export const setAuth = (emailAddress) => {
  return {
    type: SET_AUTH,
    payload: {
      isAuth: emailAddress ? true : false,
      emailAddress: emailAddress,
    },
  };
};

export const logout = () => {
  clearTimeout(logoutSetTimeoutId);
  clearTokenFromLocalStorage();
  return {
    type: CLEAR_AUTH,
  };
};

export const setError = (err) => {
  return {
    type: SET_AUTH_ERROR,
    payload: {
      error: err,
    },
  };
};

export const register = ({ emailAddress, password, confirmPassword }) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await axios.post('/api/auth/register', {
        emailAddress,
        password,
        confirmPassword,
      });
      const token = response.data.token.split(' ')[1];
      const decoded = jwtDecode(token);
      addTokenToLocalStorage(token);
      dispatch(setAuth(decoded.emailAddress));
      dispatch(clearLoading());
    } catch (err) {
      dispatch(clearLoading());
      dispatch(setError(err));
    }
  };
};

export const login = ({ emailAddress, password }) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await axios.post('/api/auth/login', {
        emailAddress,
        password,
      });
      const token = response.data.token.split(' ')[1];
      const decoded = jwtDecode(token);
      addTokenToLocalStorage(token);
      dispatch(setAuth(decoded.emailAddress, false));
      dispatch(clearLoading());
    } catch (err) {
      dispatch(clearLoading());
      dispatch(setError(err));
    }
  };
};

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
