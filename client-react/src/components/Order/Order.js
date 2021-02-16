import React from 'react';
import './Order.css';

const order = ({ ingredients, price }) => {
  const ingredientsDisplay = Object.keys(ingredients).map((ingKey) => (
    <p key={ingKey}>
      {ingKey}({ingredients[ingKey]})
    </p>
  ));
  return (
    <div className="Order">
      {ingredientsDisplay}
      <p>
        <strong>${price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
