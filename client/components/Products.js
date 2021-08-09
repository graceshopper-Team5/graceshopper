import React from 'react'
import { connect } from 'react-redux';
import {getProducts} from '../store/productsreducer'
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import {addToCart, loginAddingToCart} from '../store/cartReducer'
import { Link } from 'react-router-dom';


export class Products extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.logInHandleClick = this.logInHandleClick.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }

  handleClick(product) {
    this.props.addToCart(product);
    this.props.addingToCart;
  }
  logInHandleClick(userId, product) {
    console.log("userId", userId);
    console.log("product", product);
      this.props.loginAddingToCart(userId, product);

  }

  render() {
    const products = this.props.products;
    return (
      <div className="grid">
        {this.props.products.length > 0 ? (
          products.map((product) => (
            <div className="box">
              <Card key={product.id} style={{ width: "18rem" }}>
                <Link to={`products/${product.id}`}>
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    style={{ width: "18rem", height:"18rem" }}
                  />
                </Link>
                <Card.Body>
                  <Link to={`products/${product.id}`}>
                    <Card.Title>{product.name}</Card.Title>
                  </Link>
                  <Card.Text>${product.price / 100}</Card.Text>

                  {this.props.isLoggedIn ? (
                    <Button
                      onClick={() =>
                        this.logInHandleClick(this.props.userId, product)
                      }
                    >
                      Add to cart
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => this.handleClick(product)}
                    >
                      Add to cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h3>Nothing here yet!</h3>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return{
    getProducts: () => dispatch(getProducts()),
    addToCart: (product) => dispatch(addToCart(product)),
    loginAddingToCart: (userId, product) => dispatch(loginAddingToCart(userId, product))
  }
}



export default connect(mapState, mapDispatch)(Products);
