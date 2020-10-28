import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'}
];

const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    btnDisabled={props.disabled[ctrl.type]}
                    key={ctrl.label}/>
            ))}
            <button
                className={classes.OrderButton}
                onClick={props.purchasing}
                disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
        </div>
    );
};

export default buildControls;
