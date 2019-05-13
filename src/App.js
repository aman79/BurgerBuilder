import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/authAction';

const Checkout = React.lazy(() => {
	return import('./containers/Checkout/CheckOut');
});

const Order = React.lazy(() => {
	return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
	return import('./containers/Auth/Auth');
});

const App = props => {
	useEffect(() => {
		props.authCheckState();
	}, []);

	let routes = (
		<Switch>
			<Route path='/auth' render={() => <Auth />} />
			<Route path='/' exact component={BurgerBuilder} />
			<Redirect to='/' />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path='/checkout' render={() => <Checkout />} />
				<Route path='/orders' render={() => <Order />} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' render={() => <Auth />} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		);
	}
	return (
		<div>
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
			</Layout>
		</div>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = {
	authCheckState
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
