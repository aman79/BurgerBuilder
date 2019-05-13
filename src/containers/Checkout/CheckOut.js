import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import ContactData from './ContactData/ContactData';

const CheckOut = props => {
	const checkOutCancelledHandler = () => {
		props.history.goBack();
	};

	const checkOutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	};

	let summary = <Redirect to='/' />;
	if (props.ings) {
		const purchaseRedirect = props.purchased ? <Redirect to='/' /> : null;
		summary = (
			<div>
				{purchaseRedirect}
				<CheckOutSummary
					ingredients={props.ings}
					checkOutCancelled={checkOutCancelledHandler}
					checkOutContinued={checkOutContinuedHandler}
				/>
				<Route
					path={props.match.path + '/contact-data'}
					component={ContactData}
				/>
			</div>
		);

		return summary;

		// {/*render={props => (
		//   <ContactData
		//     ingredients={this.state.ingredients}
		//     price={this.state.totalPrice}
		// {...props}
		//   />
		// )}*/}
	}
};

const mapStateToProps = state => ({
	ings: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	purchased: state.order.purchased
});

export default connect(mapStateToProps)(CheckOut);
