import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCartWithItems, placeOrder } from '../store'

class Cart extends Component {

    constructor() {
        super()
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    }

    handlePlaceOrder() {
        const { id } = this.props.cart
        this.props.placeOrder({ id, status: 'ORDER' })
    }

    render() {
        const { cart } = this.props
        const { handlePlaceOrder } = this

        return (
            <Fragment>
                <ul>
                {
                    cart.line_items.map(item => <li key={item.id}>
                        {item.product} {item.quantity}
                    </li>
                    )
                }
                </ul>
                <button onClick={ handlePlaceOrder }>Place Order</button>
            </Fragment>
        )
    }

}

const mapStateToProps = ({ orders, products }) => {
    return {
        cart: getCartWithItems(orders, products)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        placeOrder: (order) => dispatch(placeOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)