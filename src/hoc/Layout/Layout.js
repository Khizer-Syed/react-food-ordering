import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state ={
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    };

    sideDrawerToggleHandler = () => {
       this.setState((prevState, props) => {
           return {
               showSideDrawer: !prevState.showSideDrawer
           }
       });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    toggleSideDrawer={this.sideDrawerToggleHandler}
                    open={this.sideDrawerOpenHandler}
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(Layout);
