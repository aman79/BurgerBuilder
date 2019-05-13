import React, { useState } from 'react';
import { connect } from 'react-redux';

import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Auxx from '../Auxx/Auxx';
import classes from './Layout.css';

const Layout = props => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const sideDrawerCloseHandler = () => {
		setSideDrawerIsVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible(!sideDrawerIsVisible);
	};

	return (
		<Auxx>
			<ToolBar
				isAuth={props.isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={props.isAuthenticated}
				open={sideDrawerIsVisible}
				closed={sideDrawerCloseHandler}
			/>
			<main className={classes.Content}>{props.children}</main>
		</Auxx>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
