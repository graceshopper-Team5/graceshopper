import React from 'react';
import { connect } from 'react-redux';
import {getProduct} from '../store/singleProdReducer';
import { Card } from 'react-bootstrap';

export class Product extends React.Component {
  componentDidMount() {
     // retrieve the productId from route
     const productId = this.props.match.params.productId
     // pass the Id to dispatch the thunk
    this.props.getProduct(productId)
  }
  render () {
    const product = this.props.product
    return (
      <div>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {product.price}
              {product.movieTitle}
              {product.movieYear}
              {product.description}
            </Card.Text>

            </Card.Body>
          </Card>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log("this is from mapstate", state.productReducer)
  return {
    product: state.singleProdReducer
  }
}

const mapDispatch = (dispatch) => {
  return {
    getproduct: (id) => dispatch(getProduct(id))
  }
}

export default connect(mapState, mapDispatch)(Product)
