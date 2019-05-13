import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../../store/actions/authAction';

const Logout = props => {
	useEffect(() => {
		props.logout();
	}, []);

	return <Redirect to='/' />;
};

const mapDispatchToProps = { logout };

export default connect(
	null,
	mapDispatchToProps
)(Logout);
