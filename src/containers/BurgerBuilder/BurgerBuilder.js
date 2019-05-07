import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxx from '../../hoc/Auxx/Auxx';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import { addIngredient } from '../../store/actions/burgerAction';

class BurgerBuilder extends Component {
	state = {
		// ingredients: null,
		//   totalPrice: 4,
		//   purchasable: false,
		purchasing: false
		// loading: false,
		// error: false
	};

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
		// axios
		//   .get('https://react-burgerbuilder-2e398.firebaseio.com/ingredients.json')
		//   .then(response => {
		//     this.setState({ ingredients: response.data });
		//   })
		//   .catch(error => {
		//     this.setState({ error: true });
		//   });
	}

	updatePurchaseState(ingredients) {
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
	}

	purchaseHandler = () => {
		console.log(this);
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		//   queryParams.push(
		//     encodeURIComponent(i) +
		//       '=' +
		//       encodeURIComponent(this.state.ingredients[i])
		//   );
		// }
		// queryParams.push('price=' + this.state.totalPrice);
		// const queryString = queryParams.join('&');
		// this.props.history.push({
		//   pathname: '/checkout',
		//   search: '?' + queryString
		// });
		this.props.history.push('/checkout');
	};
	render() {
		const {
			ingredients,
			totalPrice,
			purchasable,
			purchasing,
			loading
		} = this.state;
		const disabledInfo = {
			...this.props.ings
		};
		for (const key in disabledInfo) {
			if (disabledInfo.hasOwnProperty(key)) {
				disabledInfo[key] = disabledInfo[key] <= 0;
			}
		}
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded !!</p>
		) : (
			<Spinner />
		);

		let orderSummary = null;

		if (this.props.ings) {
			burger = (
				<Auxx>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientsAdded={this.props.addIngredient}
						ingredientsRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
					/>
				</Auxx>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}
		// if (loading) {
		//   orderSummary = <Spinner />;
		// }
		// console.log('disabled', disabledInfo);
		return (
			<Auxx>
				<Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxx>
		);
	}
}

const mapStateToProps = state => ({
	ings: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	error: state.burgerBuilder.error,
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = {
	addIngredient
};

// const mapStateToProps = state => {
//   return {
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null
//   };
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onIngredientAdded: ingName =>
// 			dispatch(actionCreators.addIngredient(ingName)),
// 		onIngredientRemoved: ingName =>
// 			dispatch(actionCreators.removeIngredient(ingName)),
// 		onInitIngredients: () => dispatch(actionCreators.initIngredients()),
// 		onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
// 		onSetAuthRedirectPath: path =>
// 			dispatch(actionCreators.setAuthRedirectPath(path))
// 	};
// };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
