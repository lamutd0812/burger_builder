import React, { Component } from 'react';
import CheckoutSumary from '../../components/Order/CheckoutSumary/CheckoutSumary';

import { Route, Redirect } from 'react-router-dom';
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
        let sumary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            sumary = (
                <div>
                    {purchasedRedirect}
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

        return sumary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);