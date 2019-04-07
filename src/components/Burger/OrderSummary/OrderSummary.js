import React from 'react';
import Button from '../../UI/Button/Button';
import Auxx from '../../../hoc/Auxx';

const OrderSummary = props => {
  console.log('[orderSummary] rendering');
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Auxx>
      <h3>Your Order</h3>
      <p>A delecious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Success" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Danger" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Auxx>
  );
};

export default OrderSummary;
