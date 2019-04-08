import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxx from '../../hoc/Auxx/Auxx';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentWillMount() {
    axios
      .get('https://react-burgerbuilder-2e398.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
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
    this.setState({ purchasable: sum > 0 });
  }

  addIngredient = type => {
    const { ingredients, totalPrice } = this.state;

    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const price = totalPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: price });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredient = type => {
    const { ingredients, totalPrice } = this.state;

    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const price = totalPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: price });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    console.log(this);
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const { ingredients, totalPrice } = this.state;

    const order = {
      ingredients,
      totalPrice,
      customer: {
        name: 'abc',
        address: { street: 'ASFFF', country: 'yuiop', zipCode: '12345' },

        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(error => this.setState({ loading: false, purchasing: false }));
  };
  render() {
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading,
      error
    } = this.state;
    const disabledInfo = {
      ...ingredients
    };
    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }
    let burger = error ? <p>Ingredients can't be loaded !!</p> : <Spinner />;

    let orderSummary = null;

    if (ingredients) {
      burger = (
        <Auxx>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientsAdded={this.addIngredient}
            ingredientsRemoved={this.removeIngredient}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={purchasable}
            ordered={this.purchaseHandler}
          />
        </Auxx>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );
    }
    if (loading) {
      orderSummary = <Spinner />;
    }
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

export default withErrorHandler(BurgerBuilder, axios);
