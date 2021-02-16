import React from 'react';

import './BurgerIngredient.css';

const burgerIngredient = ({ type }) => {
  let ingredients = null;
  switch (type) {
    case 'breadTop':
      ingredients = (
        <div className="BreadTop">
          <div className="Seeds1"></div>
          <div className="Seeds2"></div>
        </div>
      );
      break;
    case 'breadBottom':
      ingredients = <div className="BreadBottom"></div>;
      break;
    case 'cheese':
      ingredients = <div className="Cheese"></div>;
      break;
    case 'bacon':
      ingredients = <div className="Bacon"></div>;
      break;
    case 'salad':
      ingredients = <div className="Salad"></div>;
      break;
    case 'meat':
      ingredients = <div className="Meat"></div>;
      break;
    default:
      ingredients = null;
  }
  return ingredients;
};

export default burgerIngredient;
