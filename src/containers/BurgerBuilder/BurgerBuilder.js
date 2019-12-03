import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContorols'; 
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
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
    
    purchaseClosedHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Continue');
    }

    render () { 
        const disabledInfo = {
            ...this.state.ingridients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseClosedHandler}>
                    <OrderSummary 
                        ingridients={this.state.ingridients}
                        purchaseCancle={this.purchaseCancelHandler}
                        totalPrice={this.state.totalPrice}
                        purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingridients={this.state.ingridients}/>
                <BuildControls 
                    addIngredient={this.addIngridientHandler}
                    removeIngredient={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;