import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const Products = (props) => {
    
    const { products } = props

    return (
        <Fragment>
            <h1>Products</h1>
            <ul>
            {
                products.map(product => <li key={ product.id }>
                    { product.name }
                </li> )
            }
            </ul>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Products)