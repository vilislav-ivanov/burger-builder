import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout, clearBurger, clearOrders } from '../../actions';

const Logout = ({ logout, clearBurger, clearOrders }) => {
  const history = useHistory();
  useEffect(() => {
    logout();
    clearBurger();
    clearOrders();
    history.push('/');
  });
  return null;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  clearBurger: () => dispatch(clearBurger()),
  clearOrders: () => dispatch(clearOrders()),
});

export default connect(null, mapDispatchToProps)(Logout);
