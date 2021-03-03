import React, { useEffect } from 'react';
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
// import AdminDashboard from './containers/AdminDashboard/AdminDashboard';
import { setAuth, logout } from './actions';

function App({ setAuth, logout, isAuth }) {
  const tokenId = localStorage.getItem('tokenID');
  useEffect(() => {
    if (tokenId) {
      const { email, iat, exp, isAdmin } = jwtDecode(tokenId);
      const tokenDuration = (exp - iat) * 1000;
      setAuth(email, isAdmin);
      setTimeout(() => {
        logout();
      }, tokenDuration);
    }
  }, [tokenId, setAuth, logout]);
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
        {/* <Route path="/admin-dashboard">
          {isAdmin ? <AdminDashboard /> : <Redirect to="/" />}
        </Route> */}
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

export default connect(mapStateToProps, { setAuth, logout })(App);
