import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxx from '../../hoc/Auxx/Auxx';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {
	addIngredient,
	initIngredients,
	removeIngredient
} from '../../store/actions/burgerAction';

import { purchaseInit } from '../../store/actions/orderAction';
import { setAuthRedirectPath } from '../../store/actions/authAction';

const BurgerBuilder = props => {
	const [purchasing, setPurchasing] = useState(false);

	useEffect(() => {
		console.log(props);
		props.initIngredients();
	}, []);

	// ingredients: null,
	//   totalPrice: 4,
	//   purchasable: false,
	//purchasing: false
	// loading: false,
	// error: false

	const updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		//   console.log('sum', sum);
		//this.setState({ purchasable: sum > 0 });
		return sum > 0;
	};

	const purchaseHandler = () => {
		console.log(this);
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.setAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		props.purchaseInit();
		props.history.push('/checkout');
	};

	const disabledInfo = {
		...props.ings
	};
	for (const key in disabledInfo) {
		if (disabledInfo.hasOwnProperty(key)) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
	}
	let burger = props.error ? (
		<p>Ingredients can't be loaded !!</p>
	) : (
		<Spinner />
	);

	let orderSummary = null;

	if (props.ings) {
		burger = (
			<Auxx>
				<Burger ingredients={props.ings} />
				<BuildControls
					ingredientsAdded={payload => {
						props.addIngredient(payload);
					}}
					ingredientsRemoved={payload => {
						props.removeIngredient(payload);
					}}
					disabled={disabledInfo}
					price={props.price}
					purchasable={updatePurchaseState(props.ings)}
					ordered={purchaseHandler}
					isAuth={props.isAuthenticated}
				/>
			</Auxx>
		);
		orderSummary = (
			<OrderSummary
				ingredients={props.ings}
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				price={props.price}
			/>
		);
	}
	return (
		<Auxx>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Auxx>
	);
};

const mapStateToProps = state => ({
	ings: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	error: state.burgerBuilder.error,
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = {
	addIngredient,
	removeIngredient,
	initIngredients,
	purchaseInit,
	setAuthRedirectPath
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
