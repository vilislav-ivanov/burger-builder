import {
  ADD_ORDER,
  SET_OREDERS,
  CLEAR_ORDERS,
  SET_ORDER_ERROR,
  START_LOADING,
  FINISH_LOADING,
  DELETE_ORDER,
} from '../actions/types';

const initialState = {
  orders: [],
  error: null,
  loading: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OREDERS: {
      return {
        ...state,
        error: null,
        orders: action.orders,
      };
    }
    case ADD_ORDER: {
      return {
        ...state,
        error: null,
        orders: state.orders.concat(action.order),
      };
    }
    case CLEAR_ORDERS:
      return {
        ...state,
        error: null,
        orders: [],
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
