import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
];

const buildControls = ({
  price,
  addIngredients,
  removeIngredients,
  hasIngredient,
  disableOrderButton,
  onOrderClicked,
}) => {
  return (
    <div className="BuildControls">
      <p>${price.toFixed(2)}</p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            onMoreClick={() => addIngredients(ctrl.type)}
            onLessClick={() => removeIngredients(ctrl.type)}
            disabled={!hasIngredient(ctrl.type)}
          />
        );
      })}
      <button
        className="OrderButton"
        disabled={!disableOrderButton}
        onClick={onOrderClicked}
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControls;
