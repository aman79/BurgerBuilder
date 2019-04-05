import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Aux';

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 4
  };

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
    const priceADeduction = INGREDIENT_PRICE[type];
    const price = totalPrice - priceADeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: price });
  };

  render() {
    const { ingredients } = this.state;
    return (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredient}
          ingredientRemoved={this.removeIngredient}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
