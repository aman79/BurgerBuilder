import * as actionType from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updatedObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updatedObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updatedObject(action.orderData, { id: action.orderId });
  return updatedObject(state, {
    ...state,
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFail = (state, action) => {
  return updatedObject(state, { loading: false });
};

const fetchedOrderStart = (state, action) => {
  return updatedObject(state, { loading: true });
};

const fetchedOrderSuccess = (state, action) => {
  return updatedObject(state, { orders: action.orders, loading: false });
};

const fetchedOrderFail = (state, action) => {
  return updatedObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_INIT:
      return purchaseInit(state, action);

    // return {
    //   ...state,
    //   purchased: false
    // };

    case actionType.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    // return {
    //   ...state,
    //   loading: true
    // };
    case actionType.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    // const newOrder = {
    //   ...action.orderData,
    //   id: action.orderId
    // };

    // return {
    //   ...state,
    //   loading: false,
    //   purchased: true,
    //   orders: state.orders.concat(newOrder)
    // };
    case actionType.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    // return {
    //   ...state,
    //   loading: false
    // };

    case actionType.FETCHED_ORDER_START:
      return fetchedOrderStart(state, action);
    // return {
    //   ...state,
    //   loading: true
    // };

    case actionType.FETCHED_ORDER_SUCCESS:
      return fetchedOrderSuccess(state, action);
    // return {
    //   ...state,
    //   orders: action.orders,
    //   loading: false
    // };

    case actionType.FETCHED_ORDER_FAIL:
      return fetchedOrderFail(state, action);
    // return {
    //   ...state,
    //   loading: false
    // };

    default:
      return state;
  }
};

export default reducer;
