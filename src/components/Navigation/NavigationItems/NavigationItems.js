import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavaigationItem';

const navigationItems = () => (
    <ul className={classes.NavaigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
); 

export default navigationItems;