import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler';
import { initiateOrdersAsync } from '../../actions';

const Orders = ({ orders, initOrders }) => {
  useEffect(() => {
    initOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let ingredientsDisplay = <Spinner />;
  if (orders) {
    ingredientsDisplay = orders.map((order) => (
      <Order
        key={order._id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }

  return ingredientsDisplay;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initOrders: () => dispatch(initiateOrdersAsync()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
