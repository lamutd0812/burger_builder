import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact={true}>Burger Builder</NavigationItem>
        {props.isAuthenticated ?
            <NavigationItem link="/orders" active={true}>Orders</NavigationItem> : null}
        {!props.isAuthenticated ?
            <NavigationItem link="/auth" active={true}>Authenticate</NavigationItem>
            : <NavigationItem link="/logout" active={true}>Logout</NavigationItem>}
    </ul>
);

export default navigationItems;