import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    checkoutCanceldHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ing}
                    onCheckoutCanceld={this.checkoutCanceldHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);