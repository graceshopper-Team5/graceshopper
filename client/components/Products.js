import React from 'react'
import { connect } from 'react-redux';
import {getProducts} from '../store/productsreducer'
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    console.log("these are our products", this.props.products)
  }
  render () {
    const products = this.props.products
    return (
      <div className="grid">
        
        {this.props.products.length > 0 ? (
          products.map(product => 
      
            <Card style={{ width: '300px' }}>
            <Card.Img variant="top" src={product.imageUrl} style={{ width: "40vh" }}/>
            <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <p>{product.price}</p>
            </Card.Text>
            <Button variant="primary">Add to cart</Button>
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