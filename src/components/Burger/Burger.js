import React from 'react';
import classes from './Burger.module.css';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    let items = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            console.log(igKey + i);
            return <BurgerIngridient key={igKey + i} type={igKey}/>;
        });
    })
    .reduce((array, arrayElement) => {
        return array.concat(arrayElement)
    }, []);

    if (items.length === 0) {
        items = <p>Please add ingridients to your burger</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngridient type="bread-top"/>
            {items}
            <BurgerIngridient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);