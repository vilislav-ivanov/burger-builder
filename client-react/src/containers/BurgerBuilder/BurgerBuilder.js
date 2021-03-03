import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import { addIngredient, removeIngredient } from '../../actions';

const BurgerBuilder = ({
  ingredients,
  price,
  addIngredient,
  removeIngredient,
  hasIngredients,
}) => {
  // Setting history
  const history = useHistory();
  // State
  const [displayModal, setDisplayModal] = useState(false);

  const hasIngredient = (ingredient) => {
    return ingredients[ingredient] > 0;
  };
  const handleDisplayModal = () => {
    setDisplayModal(true);
  };

  const hideModal = () => {
    setDisplayModal(false);
  };

  const continueToCheckout = () => {
    history.push('/checkout');
  };

  return (
    <Fragment>
      <Modal show={displayModal} onClick={hideModal}>
        <OrderSummery
          ingredients={ingredients}
          price={price}
          onCancelClicked={hideModal}
          onContinueClicked={continueToCheckout}
        />
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        price={price}
        addIngredients={addIngredient}
        removeIngredients={removeIngredient}
        hasIngredient={hasIngredient}
        disableOrderButton={hasIngredients}
        onOrderClicked={handleDisplayModal}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    hasIngredients: state.burger.hasIngredients,
  };
};

export default connect(mapStateToProps, { addIngredient, removeIngredient })(
  BurgerBuilder
);
