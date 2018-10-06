import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { getProducts, productsReducer } from './reducers/products'
import { ordersReducer, resetOrders, getOrders, getCart, getCompletedOrders } from './reducers/orders'

const store = createStore(combineReducers({
    products: productsReducer,
    orders: ordersReducer
}), applyMiddleware(logger, thunk))

export { getProducts, resetOrders, getOrders, getCart, getCompletedOrders } 
export default store