import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import './CheckoutSummary.css';

const checkoutSummary = ({
  ingredients,
  price,
  onContinueClicked,
  onCencelClicked,
}) => {
  let burger = <Spinner />;

  if (ingredients) {
    burger = <Burger ingredients={ingredients} />;
  }

  return (
    <div className="CheckoutSummary">
      {burger}
      <h4>Hope you like your burger</h4>
      <p>
        Price: <strong>${price.toFixed(2)}</strong>
      </p>
      <Button type="Success" onClick={onContinueClicked}>
        CONTINUE
      </Button>
      <Button type="Danger" onClick={onCencelClicked}>
        CENCEL
      </Button>
    </div>
  );
};

export default checkoutSummary;
