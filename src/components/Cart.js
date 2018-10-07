import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCartWithItems, placeOrder, deleteLineItemFromCart, updateLineItemInCart } from '../store'

class Cart extends Component {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    }

    handleChange(event, cartId, itemId) {
        this.props.updateLineItemInCart(cartId, Number(event.target.value), itemId)
    }


    handleRemoveFromCart(cartId, itemId) {
        this.props.deleteLineItemFromCart(cartId, itemId)
    }

    handlePlaceOrder() {
        const { id } = this.props.cart
        this.props.placeOrder({ id, status: 'ORDER' })
    }

    render() {
        const { cart } = this.props
        const { handlePlaceOrder, handleRemoveFromCart, handleChange } = this

        return (
            <Fragment>
                <h1>Cart</h1>
                <ul>
                {
                    cart.line_items.map(item => <li key={item.id}>
                        {item.product} 
                        <input type="number" name="quantity" min="1" defaultValue={item.quantity}
                            onChange={(event) => handleChange(event, cart.id, item.id)}></input>
                        <button onClick={() => handleRemoveFromCart(cart.id, item.id)}>Remove</button>
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
        placeOrder: (order) => dispatch(placeOrder(order)),
        deleteLineItemFromCart: (cartId, itemId) => dispatch(deleteLineItemFromCart(cartId, itemId)),
        updateLineItemInCart: (cartId, quantity, itemId) => dispatch(updateLineItemInCart(cartId, { quantity }, itemId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)