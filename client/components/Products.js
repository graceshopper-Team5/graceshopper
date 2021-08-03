import React from 'react'
import { connect } from 'react-redux';
import {getProducts} from '../store/productsreducer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';


export class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    console.log("these are our products", this.props.products)
  }
  render () {
    const products = this.props.products
    return (
      <div>
        
        {this.props.products.length > 0 ? (
          products.map(product => 
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <p>{product.price}</p>
            </Card.Text>

            </Card.Body>
          </Card> )
        ): (<h3>Nothing here yet!</h3>)}
      </div>
    )
  }
}

const mapState = (state) => {
  console.log("this is from mapstate", state.productsReducer)
  return {
    products: state.productsReducer
  }
}

const mapDispatch = (dispatch) => {
  return{
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapState, mapDispatch)(Products)