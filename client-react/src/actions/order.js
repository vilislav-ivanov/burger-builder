import axios from '../axios';

import {
  ADD_ORDER,
  SET_OREDERS,
  CLEAR_ORDERS,
  SET_ORDER_ERROR,
  ORDER_START_LOADING,
  DELETE_ORDER,
} from './types';

export const setOrders = (orders) => {
  return {
    type: SET_OREDERS,
    orders,
  };
};

export const addOrder = (orderData) => {
  return (dispatch) => {
    dispatch({ type: ORDER_START_LOADING });
    axios
      .post('/api/order', orderData)
      .then((response) => {
        dispatch({ type: ADD_ORDER, order: response.data.order });
      })
      .catch((err) => {
        dispatch({ type: SET_ORDER_ERROR, payload: err });
      });
  };
};

export const getAllOrders = () => {
  return (dispatch) => {
    dispatch({ type: ORDER_START_LOADING });
    axios
      .get('api/order/')
      .then((response) => {
        dispatch(setOrders(response.data.orders));
      })
      .catch((err) => {
        dispatch({ type: SET_ORDER_ERROR, payload: err });
      });
  };
};

export const deleteOrder = (orderId) => ({
  type: DELETE_ORDER,
  payload: orderId,
});

export const clearOrders = () => ({
  type: CLEAR_ORDERS,
});
