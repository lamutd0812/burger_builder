import React, { Component } from 'react';
import CheckoutSumary from '../../components/Order/CheckoutSumary/CheckoutSumary';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        // see 215 (07:00): Why not componentDidMount? 
        const query = new URLSearchParams(this.props.location.search); // docs: https://www.jackfranklin.co.uk/blog/url-search-params/
        const ingredients = {}; // ingredients received from OrderSumary (BurgerBuilder)
        let price = 0;
        for (let param of query.entries()) {
            //query.entries() => ['salad', '1'], ['bacon','2'],...
            if (param[0] === 'price') {
                price = param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props} />
                        // {...props}: add props to create history in route to '/contact-data'
                    )}
                />
            </div>
        );
    }
}

export default Checkout;