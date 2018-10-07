import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCompletedOrders } from '../store'

class Orders extends Component {

    render() {
        const { completedOrders } = this.props

        return (
            <Fragment>
                <h1>Orders</h1>
                <ul>
                {
                    completedOrders.map(order => <li key={order.id}>
                        {order.id}
                        <ul>
                        {
                            order.line_items.map(item => <li key={item.id}>
                                {item.product} {item.quantity}
                            </li>
                            )
                        }
                        </ul>
                    </li>
                    )
                }
                </ul>
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