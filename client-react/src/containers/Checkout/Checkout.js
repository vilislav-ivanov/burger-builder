import React, { Fragment } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({ price, ingredients }) => {
  const history = useHistory();
  const onContinueClicked = (e) => {
    e.preventDefault();
    history.push(history.location.pathname + '/chechout-summary');
  };

  const onCencelClicked = () => {
    history.goBack();
  };

  return price && ingredients ? (
    <Fragment>
      <CheckoutSummary
        ingredients={ingredients}
        onContinueClicked={onContinueClicked}
        onCencelClicked={onCencelClicked}
        price={price}
      />
      <Route path="/checkout/chechout-summary">
        <ContactData ingredients={ingredients} price={price} />
      </Route>
    </Fragment>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.price,
  };
};

export default connect(mapStateToProps)(Checkout);
