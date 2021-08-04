import React from 'react'
import { connect } from 'react-redux';
import {getProduct} from '../store/singleProdReducer'

// import { Card } from 'react-bootstrap';

export class Product extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }
  render () {
    const product = this.props.product
    return (
      <div>
          {/* <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <p>{product.price}</p>
              <p>{product.movieTitle}</p>
              <p>{product.movieYear}</p>
              <p>{product.description}</p>
            </Card.Text>

            </Card.Body>
          </Card> */}
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
  return{
    getproduct: (id) => dispatch(getProduct(id))
  }
}

export default connect(mapState, mapDispatch)(Product)