import React , {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import {fetchOrders} from "../../store/actions";
import {connect} from 'react-redux';
class Orders extends Component {

    componentDidMount() {
       this.props.onOrdersInit(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
           orders = this.props.orders.map(order => {
               return <Order key={order.id} ingredients={order.ingredients} price={Number.parseFloat(order.price)}/>
           })
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrdersInit: (token, userId) => dispatch(fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
