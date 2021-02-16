import {
  ADD_INGREDIENT,
  CLEAR_BURGER,
  REMOVE_INGREDIENT,
} from '../actions/types';

const initialState = {
  ingredients: {
    meat: 0,
    cheese: 0,
    bacon: 0,
    salad: 0,
  },
  ingredientsPrice: {
    meat: 0.6,
    cheese: 0.4,
    salad: 0.3,
    bacon: 0.5,
  },
  price: 0.7,
  ingredientsAvailability: false,
};

const checkIngredientsAvailability = (ingredients) => {
  const ingredientsCount = Object.values(ingredients).reduce(
    (prevValue, value) => {
      return prevValue + value;
    },
    0
  );

  return ingredientsCount > 0;
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const updatedIngredients = {
        ...state.ingredients,
        [action.ingredeintType]: state.ingredients[action.ingredeintType] + 1,
      };
      const updatedState = {
        ...state,
        ingredients: updatedIngredients,
        price: state.price + state.ingredientsPrice[action.ingredeintType],
        ingredientsAvailability: checkIngredientsAvailability(
          updatedIngredients
        ),
      };
      return updatedState;
    }
    case REMOVE_INGREDIENT: {
      const updatedIngredients = {
        ...state.ingredients,
        [action.ingredeintType]:
          state.ingredients[action.ingredeintType] > 0
            ? state.ingredients[action.ingredeintType] - 1
            : 0,
      };
      const updatedState = {
        ...state,
        ingredients: updatedIngredients,
        price:
          state.price - state.ingredientsPrice[action.ingredeintType] > 0
            ? state.price - state.ingredientsPrice[action.ingredeintType]
            : 0,
        ingredientsAvailability: checkIngredientsAvailability(
          updatedIngredients
        ),
      };
      return updatedState;
    }
    case CLEAR_BURGER: {
      console.log('CLEAR_BURGER');
      return {
        ingredients: {
          meat: 0,
          cheese: 0,
          bacon: 0,
          salad: 0,
        },
        ingredientsPrice: {
          meat: 0.6,
          cheese: 0.4,
          salad: 0.3,
          bacon: 0.5,
        },
        price: 0.7,
        ingredientsAvailability: false,
      };
    }
    default:
      return state;
  }
};

export default burgerReducer;
