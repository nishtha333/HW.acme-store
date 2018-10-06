import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCart, getCompletedOrders, resetOrders } from '../store'

class Nav extends Component {

    render() {

        const { cart, completedOrders, resetOrders } = this.props

        return (
            <Fragment>
                <h1>Acme Store</h1>
                <ul>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart ( {`${cart.length}`} )</Link>
                    </li>
                    <li>
                        <Link to="/orders">Account - Orders ( {`${completedOrders.length}`} )</Link>
                    </li>
                    <button onClick={() => resetOrders()}>Reset</button>
                </ul>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: getCart(state.orders),
        completedOrders: getCompletedOrders(state.orders)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetOrders: () => dispatch(resetOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)