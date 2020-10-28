import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Checkout extends Component {
    /*    state ={
            ingredients: null,
            totalPrice: 0
        };*/

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    /*    componentWillMount() {
            const query = new URLSearchParams(this.props.location.search);
            const ingredients = {};
            let price = 0;
            for (let param of query.entries()) {
                if (param[0] === 'price') {
                    price = param[1];
                } else {
                    ingredients[param[0]] = +param[1];
                }
            }
            this.setState({ingredients, totalPrice: price})
        }*/

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        ingredients={this.props.ings}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>)
        }
        return summary;
    }
}


// render={(props) => <ContactData ingredients={this.props.ings} totalPrice={Number.parseFloat(this.props.price).toFixed(2)} {...props}/>} />

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);
