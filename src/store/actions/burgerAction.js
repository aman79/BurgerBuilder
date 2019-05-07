import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = name => dispatch => {
	dispatch({
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	});
};

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const fetchedIngredientsFailed = () => {
	return {
		type: actionTypes.FETCHED_INGREDIENTS_FAILED
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const initIngredients = () => dispatch => {
	axios
		.get('https://react-burgerbuilder-2e398.firebaseio.com/ingredients.json')
		.then(response => {
			dispatch(setIngredients(response.data));
		})
		.catch(error => {
			dispatch(fetchedIngredientsFailed());
		});
};
