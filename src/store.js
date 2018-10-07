import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { getProducts, productsReducer, getProduct } from './reducers/products'
import { ordersReducer, resetOrders, getOrders, createCart, getCart, placeOrder, 
    createLineItemInCart, deleteLineItemFromCart, updateLineItemInCart } from './reducers/orders'

const store = createStore(combineReducers({
    products: productsReducer,
    orders: ordersReducer
}), applyMiddleware(logger, thunk))

const getCartWithItems = (orders, products) => {
    const emptyCart = { line_items: [] }

    if(!orders || !products) return emptyCart

    const cart = getCart(orders)
    if(!cart) return emptyCart

    return (!cart.line_items) ? {...cart, line_items: []}
        : {...cart, line_items: cart.line_items.map(item => ({...item, product: getProduct(item.productId, products).name }))}       
}


const getCompletedOrders = (orders, products) => {
    if(!orders || !products) return []
    return orders.filter( order => order.status === 'ORDER' )
        .map(order => {
            const items = order.line_items.map(item => ({...item, product: getProduct(item.productId, products).name }))
            return {...order, line_items: items}
    })
}

export { getProducts, resetOrders, getOrders, getCartWithItems, getCompletedOrders, createCart, 
    placeOrder, createLineItemInCart, deleteLineItemFromCart, updateLineItemInCart } 
export default store