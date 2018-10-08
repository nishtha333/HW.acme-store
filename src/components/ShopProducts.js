import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Card, Grid, CardContent, CardActions } from '@material-ui/core'
import { createCart, getCartWithItems, createLineItemInCart, updateLineItemInCart } from '../store'
import ItemQuantity from './ItemQuantity'

class Products extends Component {

    constructor() {
        super()
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, productId) {
        this.productQty[productId] = event.target.value
    }

    handleAddToCart(productId, quantity) {

        const item = { productId, quantity }
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
                updateLineItemInCart(cart.id, item.quantity, lineItem.id)
            }
        }
    }

    render () {
        const { products } = this.props  
        const { handleAddToCart } = this

        return (
            <Fragment>
                <Grid container style={{flexGrow:1}} spacing={16} >
                {
                    products.map(product => <Grid item xs={12} key={product.id}>
                        <Card style={{padding: "40px", margin: "20px", display: "flex"}}>
                            <CardContent>
                                <Typography variant="subheading">{product.name}</Typography>
                            </CardContent>
                            <CardActions>
                                <ItemQuantity addToCart={handleAddToCart} productId={product.id} />
                            </CardActions>   
                        </Card>               
                    </Grid>
                    )
                }
                </Grid>
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