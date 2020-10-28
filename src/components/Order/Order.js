import React from 'react';
import classes from './Order.css'
const order = props => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid green',
            padding: '5px',
            borderRadius: '20px'
        }} key={ig.name}>{ig.name} ({ig.quantity})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;
