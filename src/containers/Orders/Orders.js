import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true
  // };

  componentDidMount() {
    // axios
    //   .get('/orders.json')
    //   .then(res => {
    //     const fetchedOrder = [];
    //     for (let key in res.data) {
    //       fetchedOrder.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     console.log(fetchedOrder);
    //     this.setState({ loading: false, orders: fetchedOrder });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });

    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    console.log('Orders.js', this.props.orders);
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id} ingredients={order.ings} price={+order.price} />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
