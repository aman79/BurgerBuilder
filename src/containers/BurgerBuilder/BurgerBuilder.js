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

  // addIngredient = type => {
  //   const { ingredients, totalPrice } = this.state;

  //   const oldCount = ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const price = totalPrice + priceAddition;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: price });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredient = type => {
  //   const { ingredients, totalPrice } = this.state;

  //   const oldCount = ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICE[type];
  //   const price = totalPrice - priceDeduction;
  //   this.setState({ ingredients: updatedIngredients, totalPrice: price });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    console.log(this);
    this.setState({ purchasing: true });
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
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
