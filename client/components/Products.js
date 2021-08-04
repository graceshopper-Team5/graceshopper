import React from 'react'
import { connect } from 'react-redux';
import {getProducts} from '../store/productsreducer'
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


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

            <Card key={product.id}style={{ width: '300px' }}>
            <Link to={`products/${product.id}`}>
            <Card.Img variant="top" src={product.imageUrl} style={{ width: "40vh" }}/>
            </Link>
            <Card.Body>
              <Link to={`products/${product.id}`}>
              <Card.Title>{product.name}</Card.Title>
              </Link>
            <Card.Text>
              {product.price}
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
