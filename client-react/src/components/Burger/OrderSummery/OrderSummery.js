import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const orderSummery = ({
  ingredients,
  price,
  onContinueClicked,
  onCancelClicked,
}) => {
  const ingredientsList = Object.keys(ingredients).map((igKey, i) => {
    return (
      <li key={igKey + i}>
        {igKey} - {ingredients[igKey]}
      </li>
    );
  });

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsList}</ul>
      <p>
        <strong>Total Price: {price.toFixed(2)}</strong>
      </p>
      <Button type="Success" onClick={onContinueClicked}>
        Continue
      </Button>
      <Button type="Danger" onClick={onCancelClicked}>
        Cencel
      </Button>
    </Fragment>
  );
};

export default orderSummery;
