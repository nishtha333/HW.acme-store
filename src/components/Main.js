import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProducts, getOrders } from '../store'
import Nav from './Nav'
import Products from './Products'

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
                        <Route path="/shop" render={() => <Products />} />
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