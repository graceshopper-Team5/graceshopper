import React from "react";
import { connect } from "react-redux";
import {
  getCartProducts,
  deleteProduct,
  getLoggedInCart,
  clear_cart,
  _clear_loggedin_cart,
} from "../store/cartReducer";
import {loginChangeQuantity} from "../store/productsreducer"
import Checkout from './Checkout'
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import {Link} from 'react-router-dom'
export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedProducts: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClearCartClick = this.handleClearCartClick.bind(this);
    this.handleIncreaseClick = this.handleIncreaseClick.bind(this);
  }

  componentDidMount() {
    // boolean different thunk if user is logged in
    // gets the products if the user is not logged in
    let products = this.props.isLoggedIn
      ? this.props.getLoggedInCart(this.props.userId)
      : this.props.getCartProducts();
    this.setState({
      addedProducts: products,
    });
    // getting cart from DB
  }
  handleIncreaseClick(product, update){
    this.props.changeQuantity(product,update)
  }

  handleClick(product) {
    this.props.deleteProduct(product);
  }

  handleClearCartClick() {
    this.props.isLoggedIn
      ? this.props._clear_loggedin_cart()
      : this.props.clear_cart();
  }


  render() {
    // add the checkout feature
    let addedItems = this.props.addedProducts.length ? (
      (
      this.props.addedProducts.map((product) => {
        return (
          <div className="collection-item avatar" key={product.id}>
            <Container>
              <Row className="justify-content-md-center">
                <Col xs lg="2">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={product.imageUrl} />
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: ${product.price / 100}</Card.Text>
                    <div className="quantityButtons">
                      <Button size="sm">-</Button>
                      <h5> {product.quantity} </h5>
                      <Button
                        size="sm"
                        onClick={() =>
                        this.handleIncreaseClick(product.id,{type:"increase"})
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => this.handleClick(product)}
                    >
                      Remove
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        );
      }))
    ) : (
      <div className="Title">
      <p>Nothing.</p>
      </div>
    );

    return (
      <div className="container">
        <div className="cart Title">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Button variant="primary" onClick={() => this.handleClearCartClick()}>
          <Link className="linkedButton" to='/checkout' >
          GIMME, GIMME, GIMME
         </Link>
        </Button>
        <Button variant="primary" onClick={() => this.handleClearCartClick()}>
          Clear Cart
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // taking state and products
  return {
    isLoggedIn: !!state.auth.id,
    addedProducts: state.addedProducts,
    userId: state.auth.id
  };
};

// history will be passed down to all thunks below
const mapDispatchToProps = (dispatch, {history}) => {
  return {
    getLoggedInCart: (id) => dispatch(getLoggedInCart(id)),
    clear_cart: () => dispatch(clear_cart()),
    // get Cart products only relies on state
    getCartProducts: () => dispatch(getCartProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    _clear_loggedin_cart: () => dispatch(_clear_loggedin_cart()),
    changeQuantity: (product, increase) => dispatch(loginChangeQuantity(product, increase))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
