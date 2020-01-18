import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContorols'; 
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHnadler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }

    componentDidMount () {
        console.log(this.props);
        this.props.onInintIngredients();

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(inKey => {
            return ingredients[inKey];
        }).reduce((sum, elem) => {
            return sum + elem;
        }, 0);
        return sum > 0;
    }
    
    purchaseClosedHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout'); //pushes the new page in the stack, meaning opens a new page 
    }

    render () { 
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>not ingredients</p> : <Spinner/>

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>;
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancle={this.purchaseCancelHandler}
            totalPrice={this.props.price}
            purchaseContinue={this.purchaseContinueHandler}/>;       
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
        onInintIngredients: () =>  dispatch(actionTypes.initIngredients()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));