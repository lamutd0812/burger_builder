import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        // const orders = !this.props.loading ? this.props.orders.map(order => (
        //     <Order
        //         key={order.id}
        //         id={order.id}
        //         ingredients={order.ingredients}
        //         price={order.price} />)) : <Spinner />; // another way
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    id={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ));
        }

        return (
            <div>
                <p style={{ textAlign: 'center', fontSize: '1.5em' }}><strong>YOUR ORDERS</strong></p>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));