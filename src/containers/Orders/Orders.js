import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/orderAction';

class Orders extends Component {
	componentDidMount() {
		this.props.fetchOrders(this.props.token, this.props.userId);
	}

	render() {
		console.log('Orders.js', this.props.orders);
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map(order => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={+order.price}
				/>
			));
		}
		return <div>{orders}</div>;
	}
}

const mapStateToProps = state => ({
	orders: state.order.orders,
	loading: state.order.loading,
	token: state.auth.token,
	userId: state.auth.userId
});

const mapDispatchToProps = {
	fetchOrders
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
