import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl  from '../BuildControl/BuildControl'

const controls = [
    {lable: 'Salad', type: 'salad'},
    {lable: 'Cheese', type: 'cheese'},
    {lable: 'Bacon', type: 'bacon'},
    {lable: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(cntl => (
            <BuildControl 
            key={cntl.lable} 
            lable={cntl.lable}
            more={() => props.addIngredient(cntl.type)}
            less={() => props.removeIngredient(cntl.type)} 
            disabled={props.disabled[cntl.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}>Order Now</button>
    </div>
);

export default buildControls;