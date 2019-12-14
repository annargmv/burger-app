import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    checkoutCanceldHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1];
                console.log("this is the price:" + price);
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, price: price})
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCanceld={this.checkoutCanceldHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)}/>
            </div>
        );
    }

}

export default Checkout;