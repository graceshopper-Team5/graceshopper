import React from 'react';
import { connect } from 'react-redux';
import {getProduct} from '../store/singleProdReducer';
import { Card, Button } from 'react-bootstrap';

export class Product extends React.Component {
  componentDidMount() {
     // retrieve the productId from route
     const productId = this.props.match.params.id
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
            <Card.Text>{product.price}</Card.Text>
            <Card.Text>{product.movieTitle}</Card.Text>
            <Card.Text>{product.movieYear}</Card.Text>
            <Card.Text>{product.description}</Card.Text>
            <Button variant="primary">
              {/* we need a link that leads to cart */}
              Add to cart
              </Button>
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
    getProduct: (id) => dispatch(getProduct(id))
  }
}

export default connect(mapState, mapDispatch)(Product)
