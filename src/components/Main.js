import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProducts, getOrders } from '../store'
import Nav from './Nav'
import ShopProducts from './ShopProducts'
import Cart from './Cart'
import Orders from './Orders';

class Main extends Component {

    componentDidMount() {
        this.props.getProducts()
        this.props.getOrders()
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <Nav />
                    <Switch>
                        <Route path="/orders" render={() => <Orders />} />  
                        <Route path="/cart" render={() => <Cart />} />
                        <Route path="/" render={({ history }) => <ShopProducts history={ history }/>} />                 
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts()),
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(null, mapDispatchToProps)(Main)