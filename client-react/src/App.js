import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import './App.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authenticate from './containers/Authenticate/Authenticate';
import Logout from './containers/Logout/Logout';
import AdminDashboard from './containers/AdminDashboard/AdminDashboard';
import { setAuth, logout } from './actions';

function App({ setAuth, logout, isAuth, isAdmin }) {
  const checkLocalStorageForToken = () => {
    const tokenId = localStorage.getItem('tokenID');
    if (tokenId) {
      const { email, iat, exp, isAdmin } = jwtDecode(tokenId);
      const tokenDuration = (exp - iat) * 1000;
      setAuth(email, isAdmin);
      setTimeout(() => {
        logout();
      }, tokenDuration);
    }
  };
  checkLocalStorageForToken();
  return (
    <Layout>
      <Switch>
        <Route path="/checkout">
          {isAuth ? <Checkout /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/orders">
          {isAuth ? <Orders /> : <Redirect to="/" />}
        </Route>
        (
        <Route path="/auth">
          {!isAuth ? <Authenticate /> : <Redirect to="/" />}
        </Route>
        <Route path="/logout">
          {isAuth ? <Logout /> : <Redirect to="/" />}
        </Route>
        <Route path="/admin-dashboard">
          {isAdmin ? <AdminDashboard /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          <BurgerBuilder />
        </Route>
      </Switch>
    </Layout>
  );
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  isAdmin: state.auth.isAdmin,
});
const mapDispatchToProps = (dispatch) => ({
  setAuth: (email, isAdmin) => dispatch(setAuth(email, isAdmin)),
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
