import * as actionType from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updatedObject(
    state.ingredients,
    updatedIngredient
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updateRemovedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updateRemovedIngredients = updatedObject(
    state.ingredients,
    updateRemovedIngredient
  );
  const updateRemovedIngredientState = {
    ingredients: updateRemovedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updatedObject(state, updateRemovedIngredientState);
};

const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchedIngredientFailed = (state, action) => {
  return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredient(state, action);

    // return {
    //   ...state,
    //   ingredients: {
    //     ...state.ingredients,
    //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    //   },
    //   totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    // };
    case actionType.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    // return {
    //   ...state,
    //   ingredients: {
    //     ...state.ingredients,
    //     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    //   },
    //   totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    // };
    case actionType.SET_INGREDIENTS:
      return setIngredients(state, action);

    // return {
    //   ...state,
    //   ingredients: {
    //     salad: action.ingredients.salad,
    //     bacon: action.ingredients.bacon,
    //     cheese: action.ingredients.cheese,
    //     meat: action.ingredients.meat
    //   },
    //   totalPrice: 4,
    //   error: false
    // };
    case actionType.FETCHED_INGREDIENTS_FAILED:
      return fetchedIngredientFailed(state, action);
    // return {
    //   ...state,
    //   error: false
    // };

    default:
      return state;
  }
};

export default reducer;
