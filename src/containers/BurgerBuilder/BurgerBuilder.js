import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContorols'; 
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHnadler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDEINTS_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};
class BurgerBuilder extends Component{
    state = {
        ingridients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-app-bbaa4.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingridients: response.data});
                return response;
            })
            .catch(error => {
                this.setState({error: true});
            });
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
        this.setState({loading: true});
        const order = {
            ingridients: this.state.ingridients,
            price: this.state.totalPrice,
            customer: {
                name: 'Anna',
                email: 'anna@test.com'
            }
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
        });
    }

    render () { 
        const disabledInfo = {
            ...this.state.ingridients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>not ingredients</p> : <Spinner/>

        if (this.state.ingridients) {
            burger = (
                <Aux>
                    <Burger ingridients={this.state.ingridients}/>
                    <BuildControls 
                        addIngredient={this.addIngridientHandler}
                        removeIngredient={this.removeIngridientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>;
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingridients={this.state.ingridients}
            purchaseCancle={this.purchaseCancelHandler}
            totalPrice={this.state.totalPrice}
            purchaseContinue={this.purchaseContinueHandler}/>;       
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);