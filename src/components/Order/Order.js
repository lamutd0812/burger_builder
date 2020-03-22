import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            id: ingredientName.id,
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = ingredients.map(ig => {
        return (
            <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ig.name}>
                {ig.name}: {ig.quantity}
            </span>
        );
    })

    return (
        <div className={classes.Order}>
            <p><strong>Order ID: </strong> {props.id}</p>
            <p><b>Ingredients:</b> {ingredientOutput}</p>
            <p> <strong>Price: </strong>{Number.parseFloat(props.price).toFixed(2)}$</p>
        </div>
    );
};

export default order