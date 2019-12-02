import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContorols'; 

const INGREDEINTS_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};
class BurgerBuilder extends Component{
    state = {
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }

    updatePurchaseState = (ingridients) => {
        const sum = Object.keys(ingridients).map(inKey => {
            return ingridients[inKey];
        }).reduce((sum, elem) => {
            return sum + elem;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;

        const priceAddition = INGREDEINTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridients})
        this.updatePurchaseState(updatedIngridients);
    }

    removeIngridientHandler = (type) => {
        const currentCount = this.state.ingridients[type];
        if (currentCount <= 0) {
            return;
        }
        const newCount = currentCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = newCount;

        const currentPriceSubtraction = INGREDEINTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - currentPriceSubtraction;
        this.setState({totalPrice: newPrice, ingridients: updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    }

    render () { 
        const disabledInfo = {
            ...this.state.ingridients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls 
                    addIngredient={this.addIngridientHandler}
                    removeIngredient={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;