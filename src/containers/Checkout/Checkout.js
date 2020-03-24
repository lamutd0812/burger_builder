import React, { Component } from 'react';
import CheckoutSumary from '../../components/Order/CheckoutSumary/CheckoutSumary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        //this.props.history.push('/');
        this.props.history.goBack(); // another way
    }

    checkoutContinuedHandler = () => {
        //this.props.history.push('/checkout/contact-data');
        this.props.history.replace('/checkout/contact-data'); // another way
    }

    render() {
        return (
            <div>
                <CheckoutSumary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);