import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const _getProducts = (products) => ({ type: GET_PRODUCTS, products })

const getProducts = () => {
    return (dispatch) => {
        axios.get('/api/products')
            .then(response => response.data)
            .then(products => dispatch(_getProducts(products)))
    }
}

const productsReducer = (state = [], action) => {
    switch(action.type) {
        case GET_PRODUCTS:
            return action.products
        default:
            return state
    }
}

const getProduct = (id, products) => {
    return products.find(product => product.id === id)
}

export { getProducts, productsReducer, getProduct }