import React from 'react';
import CheckoutSumary from '../../components/Order/CheckoutSumary/CheckoutSumary';

import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const checkout = props => {
    const checkoutCancelledHandler = () => {
        //props.history.push('/');
        props.history.goBack(); // another way
    }

    const checkoutContinuedHandler = () => {
        //props.history.push('/checkout/contact-data');
        props.history.replace('/checkout/contact-data'); // another way
    }

    let sumary = <Redirect to="/" />;
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        sumary = (
            <div>
                {purchasedRedirect}
                <CheckoutSumary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
    return sumary;
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);