import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};
export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (orderData, token) => dispatch => {
	dispatch(purchaseBurgerStart());

	axios
		.post('/orders.json?auth=' + token, orderData)
		.then(response => {
			dispatch(purchaseBurgerSuccess(response.data.name, orderData));
		})
		.catch(error => {
			dispatch(purchaseBurgerFail(error));
		});
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchedOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCHED_ORDER_SUCCESS,
		orders: orders
	};
};

export const fetchOrderFail = error => {
	return {
		type: actionTypes.FETCHED_ORDER_FAIL,
		error: error
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCHED_ORDER_START
	};
};

export const fetchOrders = (token, userId) => dispatch => {
	dispatch(fetchOrderStart());
	const queryParams =
		'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
	axios
		.get('/orders.json' + queryParams)
		.then(res => {
			const fetchedOrder = [];
			for (let key in res.data) {
				fetchedOrder.push({
					...res.data[key],
					id: key
				});
			}
			console.log(fetchedOrder);
			dispatch(fetchedOrdersSuccess(fetchedOrder));
		})
		.catch(err => {
			dispatch(fetchOrderFail(err));
		});
};
