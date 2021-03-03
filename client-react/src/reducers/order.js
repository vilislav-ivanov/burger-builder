import {
  ADD_ORDER,
  SET_OREDERS,
  CLEAR_ORDERS,
  SET_ORDER_ERROR,
  ORDER_START_LOADING,
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
        loading: false,
        error: null,
        orders: action.orders,
      };
    }
    case ADD_ORDER: {
      return {
        ...state,
        loading: false,
        error: null,
        orders: state.orders.concat(action.order),
      };
    }
    case CLEAR_ORDERS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: [],
      };
    case DELETE_ORDER:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    case ORDER_START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
