import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler';
import { getAllOrders } from '../../actions';

const Orders = ({ orders, getAllOrders }) => {
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

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

const mapStateToProps = (state) => ({
  orders: state.order.orders,
});

export default connect(mapStateToProps, { getAllOrders })(
  withErrorHandler(Orders, axios)
);
