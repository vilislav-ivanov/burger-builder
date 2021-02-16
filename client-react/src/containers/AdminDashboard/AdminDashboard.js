import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios';
import OrderAction from '../../components/OrderAction/OrderAction';
import {
  initiateAdminOrdersAsync,
  deleteOrderAsync,
  changeOrderStageAsync,
} from '../../actions';
import Spinner from '../../components/UI/Spinner/Spinner';

const AdminDashboard = ({
  initOrders,
  setOrderStage,
  deleteOrder,
  orders,
  loading,
}) => {
  const history = useHistory();
  useEffect(() => {
    initOrders();
  }, [initOrders]);

  const handleAcceptButtonClick = (orderId) => {
    setOrderStage(orderId, 'accepted');
  };

  const handleSendButtonClick = (orderId) => {
    setOrderStage(orderId, 'sent');
  };

  const handleDeleteButtonClick = (orderId) => {
    deleteOrder(orderId, history);
  };

  const dispayOrders = orders.map((order) => {
    return (
      <OrderAction
        key={order._id}
        ingredients={order.ingredients}
        name={order.name}
        email={order.email}
        address={order.address}
        postalCode={order.postalCode}
        price={order.price}
        onAcceptButtonClicked={() => handleAcceptButtonClick(order._id)}
        onSendButtonClicked={() => handleSendButtonClick(order._id)}
        acceptButtonDisabled={
          order.stage === 'accepted' ||
          order.stage === 'sent' ||
          order.stage === 'delivered'
        }
        sendButtonDisabled={
          order.stage === 'ordered' ||
          order.stage === 'sent' ||
          order.stage === 'delivered'
        }
        onDeleteButtonClicked={() => handleDeleteButtonClick(order._id)}
      />
    );
  });
  return (
    <div>
      {loading ? <Spinner /> : <div className="row">{dispayOrders}</div>}
    </div>
  );
};

const mapStateToprops = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  initOrders: () => dispatch(initiateAdminOrdersAsync()),
  setOrderStage: (orderId, stage) =>
    dispatch(changeOrderStageAsync(orderId, stage)),
  deleteOrder: (orderId, history) =>
    dispatch(deleteOrderAsync(orderId, history)),
});

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(withErrorHandler(AdminDashboard, axios));
