import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartWithItems, getCompletedOrders, resetOrders } from '../store'

class Nav extends Component {

    render() {

        const { cart, completedOrders, resetOrders } = this.props
        const itemsInCart = cart.line_items.reduce((result, input) => (result + input.quantity), 0)

        return (
            <Fragment>
                <h1>Acme Store</h1>
                <ul>
                    <li>
                        <Link to="/">Shop</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart ( {`${itemsInCart}`} )</Link>
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

const mapStateToProps = ({orders, products}) => {
    return {
        cart: getCartWithItems(orders, products),
        completedOrders: getCompletedOrders(orders, products)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetOrders: () => dispatch(resetOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)