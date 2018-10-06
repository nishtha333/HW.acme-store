import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const RESET_ORDERS = 'RESET_ORDERS'

const _getOrders = (orders) => ({ type: GET_ORDERS, orders })
const _resetOrders =() => ({ type: RESET_ORDERS})

const getOrders = () => {
    return (dispatch) => {
        axios.get('/api/orders')
            .then(response => response.data)
            .then(orders => dispatch(_getOrders(orders)))
    }
}

const resetOrders = () => {
    return (dispatch) => {
        axios.post('/api/orders/reset')
            .then(() => dispatch(_resetOrders()))
    }
}

const ordersReducer = (state = [], action) => {
    switch(action.type) {
        case GET_ORDERS:
            return action.orders
        case RESET_ORDERS:
            return []
        default:
            return state
    }
}

const getCart = (orders) => (orders.filter( order => order.status === 'CART' ))

const getCompletedOrders = (orders) => (orders.filter( order => order.status === 'ORDER' ))

export { ordersReducer, resetOrders, getOrders, getCart, getCompletedOrders }