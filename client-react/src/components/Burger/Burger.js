import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const burger = ({ ingredients }) => {
  let ingredientsDisplay = Object.keys(ingredients)
    .map((ingKey, i) =>
      [...Array(ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      })
    )
    .reduce((prevValue, value) => {
      return prevValue.concat(value);
    }, []);

  if (ingredients.length === 0) {
    ingredientsDisplay = <p>Please add ingredients</p>;
  }

  return (
    <div className="Burger">
      <BurgerIngredient type="breadTop" />
      {ingredientsDisplay}
      <BurgerIngredient type="breadBottom" />
    </div>
  );
};

export default burger;
