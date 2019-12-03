import React, {Component} from "react";
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true

    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToogleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    drawerToogleClicked={this.sideDrawerToogleHandler}/>
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}/>
                <div>toolbar, sidedrawer, backdrop</div>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>

        )
    }
};

export default Layout;