import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = props => {
    const attachedClasses = [classes.SideDrawer];
    props.open ? attachedClasses.push(classes.Open) : attachedClasses.push(classes.Close);
    return (
        <Aux>
            <Backdrop show={props.open} hide={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}><Logo/></div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
