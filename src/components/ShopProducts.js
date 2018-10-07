import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { createCart, getCartWithItems, createLineItemInCart, updateLineItemInCart } from '../store'

class Products extends Component {

    constructor() {
        super()
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.productQty = {}
    }

    handleChange(event, productId) {
        this.productQty[productId] = event.target.value
    }

    handleAddToCart(productId) {
        
        if(!this.productQty[productId]) {
            return
        }

        const item = { productId, quantity: Number( this.productQty[productId] ) }
        const { cart, createCart, createLineItemInCart, updateLineItemInCart } = this.props

        if(!cart.id) {
            createCart(item)
        }
        else {
            const lineItem = cart.line_items.find(i => i.productId === item.productId )

            if(!lineItem) {                         /* If new lineItem */
                createLineItemInCart(cart.id, item)
            }
            else {                                  /* Update With New Qty */
                updateLineItemInCart(cart.id, (item.quantity + lineItem.quantity), lineItem.id)
            }
        }
        window.location.reload()
    }

    render () {
        const { products } = this.props  
        const { handleAddToCart, handleChange } = this

        return (
            <Fragment>
                <h1>Products</h1>
                <ul>
                {
                    products.map(product => <li key={ product.id }>
                        <label>{ product.name }</label>
                        <input type="number" name="quantity" min="1" 
                            onChange={(event) => handleChange(event, product.id)}></input>
                        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                    </li> )
                }
                </ul>
            </Fragment>
        )
    }
} 

const mapStateToProps = ({orders, products}) => {
    return {
        products,
        orders,
        cart: getCartWithItems(orders, products),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCart: (item) => dispatch(createCart(item)),
        createLineItemInCart: (cartId, item) => dispatch(createLineItemInCart(cartId, item)),
        updateLineItemInCart: (cartId, quantity, itemId) => dispatch(updateLineItemInCart(cartId, { quantity }, itemId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)