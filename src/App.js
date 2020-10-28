import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import {checkAuthState} from "./store/actions";
import {withRouter, Redirect} from "react-router-dom";
const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
    return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
    return import("./containers/Auth/Auth");
});


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {
        let routes = (
            <Switch>
                <Route path={'/auth'} component={asyncAuth} />
                <Route path={'/'} exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={'/logout'} component={Logout} />
                    <Route path={'/auth'} component={asyncAuth} />
                    <Route path={'/checkout'} component={asyncCheckout} />
                    <Route path={'/orders'} component={asyncOrders} />
                    <Route path={'/'} exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>)
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(checkAuthState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
