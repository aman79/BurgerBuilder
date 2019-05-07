import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = name => dispatch => {
	dispatch({
		type: actionTypes.ADD_INGREDIENT,
		payload: name
	});
};

export const removeIngredient = name => dispatch => {
	dispatch({
		type: actionTypes.REMOVE_INGREDIENT,
		payload: name
	});
};

export const fetchedIngredientsFailed = () => {
	return {
		type: actionTypes.FETCHED_INGREDIENTS_FAILED
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		payload: ingredients
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
