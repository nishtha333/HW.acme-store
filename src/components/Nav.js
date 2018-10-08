import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography, IconButton, Button, Badge } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { getCartWithItems, getCompletedOrders, resetOrders } from '../store'

class Nav extends Component {

    render() {

        const { cart, completedOrders, resetOrders } = this.props
        const itemsInCart = cart.line_items.reduce((result, input) => (result + input.quantity), 0)

        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" style={{flexGrow: 1}}>Acme Store</Typography>
                        <Button href="#/" color="inherit">
                            Shop
                        </Button>
                        <IconButton color="inherit" href="#/cart">
                            <Badge badgeContent={`${itemsInCart}`} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <Button href="#/orders" color="inherit">
                            <Badge badgeContent={`${completedOrders.length}`} color="secondary">
                                Orders
                            </Badge>
                        </Button>
                        <Button onClick={() => resetOrders()} color="inherit">
                            Reset
                        </Button>
                    </Toolbar>
                </AppBar>
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