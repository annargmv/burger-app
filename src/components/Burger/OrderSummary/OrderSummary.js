import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingridients)
    .map(inKey => {
        return <li key={inKey}><span style={{textTransform: 'capitalize'}}>{inKey}</span>: {props.ingridients[inKey]}</li>
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>The ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
             <Button btnType="Danger" clicked={props.purchaseCancle}>Cancel</Button>
             <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Aux>
    )
};

export default orderSummary;