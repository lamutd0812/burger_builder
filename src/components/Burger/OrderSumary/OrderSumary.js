import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSumary extends Component {
    //Note(p7-143): This could be a functional component, doesn't have to be a class

    componentWillUpdate(){
        console.log('[OrderSumary] componentWillUpdate');
    }

    render() {
        const ingredientSumary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>);
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious with the following ingredients:</p>
                <ul>
                    {ingredientSumary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSumary;