import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography, Paper, Grid, ListItem, List, ListItemText } from '@material-ui/core'
import { getCompletedOrders } from '../store'

class Orders extends Component {

    render() {
        const { completedOrders } = this.props

        return (
            <Fragment>
                <Grid container style={{flexGrow:1}} spacing={16} >
                {
                    completedOrders.map(order => <Grid item xs={12} key={order.id}>
                        <Paper style={{padding: "40px", margin: "20px"}}>
                            <Typography variant="subheading">Order # {order.id}</Typography>
                            {
                                order.line_items.map(item => <List key={item.id}>
                                    <ListItem>
                                        <ListItemText primary={`Item: ${item.product}`} secondary={`Qty: ${item.quantity}`} />
                                    </ListItem>
                                </List>
                                )
                            }
                        </Paper>
                    </Grid>
                    )
                }
                </Grid>
            </Fragment>
        )
    }

}

const mapStateToProps = ({ orders, products }) => {
    return {
        completedOrders: getCompletedOrders(orders, products)
    }
}

export default connect(mapStateToProps)(Orders)