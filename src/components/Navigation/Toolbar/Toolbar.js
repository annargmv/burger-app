import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerTooggle from '../SideDrawer/DrawerToogle/DrawerToogle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerTooggle clickOnMenu={props.drawerToogleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;