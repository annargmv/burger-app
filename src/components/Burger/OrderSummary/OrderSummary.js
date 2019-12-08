import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //this can be a funcitonal component
    componentDidUpdate() {
        console.log("Order Sumary will update");
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(inKey => {
            return <li 
                key={inKey}><span 
                style={{textTransform: 'capitalize'}}>{inKey}</span>: {this.props.ingredients[inKey]}</li>
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>The ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancle}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </Aux> 
        )
    }
};

export default OrderSummary;