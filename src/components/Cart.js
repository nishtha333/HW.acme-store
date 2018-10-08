import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography, Card, Grid, IconButton, CardContent, CardActions, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { getCartWithItems, placeOrder, deleteLineItemFromCart, updateLineItemInCart } from '../store'
import ItemQuantity from './ItemQuantity'

class Cart extends Component {

    constructor() {
        super()
        this.updateQuantity = this.updateQuantity.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    }

   updateQuantity(quantity, cartId, itemId) {
    this.props.updateLineItemInCart(cartId, quantity, itemId)
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
        const { handlePlaceOrder, handleRemoveFromCart, updateQuantity } = this

        return (
            <Fragment>
                {
                    !cart.line_items.length
                        ? <Typography variant="title" style={{margin: "20px"}}>Cart is empty</Typography>
                        :   <Grid container style={{flexGrow:1}} spacing={16} >
                            {
                                cart.line_items.map(item => <Grid item xs={12} key={item.id}>
                                    <Card style={{padding: "40px", margin: "20px", display: "flex"}}>
                                        <CardContent>
                                            <Typography variant="subheading">{item.product}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <ItemQuantity updateQuantity={updateQuantity} cartId={cart.id} itemId={item.id} quantity={item.quantity} />
                                            <IconButton onClick={() => handleRemoveFromCart(cart.id, item.id)} variant="outlined" color="secondary">
                                                <Delete />
                                            </IconButton> 
                                        </CardActions>   
                                    </Card>               
                                </Grid>
                                )
                            }
                                <Grid item xs={12}>
                                    <Button onClick={handlePlaceOrder} variant="outlined" color="primary"
                                        style={{margin: "20px"}}> Place Order </Button>
                                </Grid>
                            </Grid>
                }
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