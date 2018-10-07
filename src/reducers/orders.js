import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const RESET_ORDERS = 'RESET_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const CREATE_LINEITEM = 'CREATE_LINEITEM'
const DELETE_LINEITEM = 'DELETE_LINEITEM'
const UPDATE_LINEITEM = 'UPDATE_LINEITEM'

const _getOrders = (orders) => ({ type: GET_ORDERS, orders })
const _resetOrders = () => ({ type: RESET_ORDERS })
const _createOrder = (order) => ({ type: CREATE_ORDER, order })
const _updateOrder = (order) => ({ type: UPDATE_ORDER, order })
const _createLineItem = (cartId, lineItem) => ({ type: CREATE_LINEITEM, cartId, lineItem })
const _deleteLineItem = (cartId, itemId) => ({ type: DELETE_LINEITEM, cartId, itemId })
const _updateLineItem = (cartId, lineItem) => ({ type: UPDATE_LINEITEM, cartId, lineItem })

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

//Create Cart when the first item is added
const createCart = (item, history) => {
    return (dispatch) => {
        return axios.post('/api/orders', item)
            .then(response => response.data)
            .then(order => dispatch(_createOrder(order))) 
            .then(() => history.push('/cart'))
    }
}

const placeOrder = (order) => {
    return (dispatch) => {
        axios.put(`/api/orders/${order.id}`, order)
            .then(response => response.data)
            .then(order => dispatch(_updateOrder(order)))
    }
}

const createLineItemInCart = (cartId, item, history) => {
    return (dispatch) => {
        axios.post(`/api/orders/${cartId}/lineItems`, item)
            .then(response => response.data)
            .then(lineItem => dispatch(_createLineItem(cartId, lineItem)))
            .then(() => history.push('/cart'))
    }
}

const deleteLineItemFromCart = (cartId, itemId) => {
    return (dispatch) => {
        axios.delete(`/api/orders/${cartId}/lineItems/${itemId}`)
            .then(() => dispatch(_deleteLineItem(cartId, itemId)))
    }
}

const updateLineItemInCart = (cartId, item, itemId, history) => {
    return (dispatch) => {
        axios.put(`/api/orders/${cartId}/lineItems/${itemId}`, item)
            .then(response => response.data)
            .then(lineItem => dispatch(_updateLineItem(cartId, lineItem)))
            .then(() => history.push('/cart'))
    }
}

const ordersReducer = (state = [], action) => {
    let order, updatedOrder
    switch(action.type) {
        case GET_ORDERS:
            return action.orders
        case RESET_ORDERS:
            return []
        case CREATE_ORDER:
            return [...state, action.order]
        case UPDATE_ORDER:
            return state.map(order => order.id !== action.order.id ? order : action.order)
        case CREATE_LINEITEM:
            order = state.find(order => order.id === action.cartId)
            updatedOrder = { ...order, line_items: [...order.line_items, action.lineItem] }
            return state.map( order => order.id !== action.cartId ? order : updatedOrder )
        case DELETE_LINEITEM:
            order = state.find(order => order.id === action.cartId)
            updatedOrder = { ...order, line_items: order.line_items.filter(i => i.id !== action.itemId) }
            return state.map( order => order.id !== action.cartId ? order : updatedOrder )
        case UPDATE_LINEITEM:
            order = state.find(order => order.id === action.cartId)
            updatedOrder = { ...order, line_items: order.line_items.map(i => i.id !== action.lineItem.id ? i : action.lineItem) }
            return state.map( order => order.id !== action.cartId ? order : updatedOrder )
        default:
            return state
    }
}

const getCart = (orders) => orders.find(order => order.status === 'CART' )

export { ordersReducer, resetOrders, getOrders, createCart, getCart, placeOrder, createLineItemInCart,
    deleteLineItemFromCart, updateLineItemInCart }