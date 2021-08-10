import React from "react";
import { connect } from "react-redux";
import {
  getCartProducts,
  deleteProduct,
  changeQuantity,
  getLoggedInCart,
  clear_cart,
  _clear_loggedin_cart,
} from "../store/cartReducer";
import Checkout from './Checkout'
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import {Link} from 'react-router-dom'
export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 2,
      addedProducts: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClearCartClick = this.handleClearCartClick.bind(this);
    // this.changeClick = this.changeClick.bind(this)
  }

  componentDidMount() {
    // boolean different thunk if user is logged in
    // gets the products if the user is not logged in
    console.log("this.props", this.props);
    let products = this.props.isLoggedIn
      ? this.props.getLoggedInCart(this.props.userId)
      : this.props.getCartProducts();
    this.setState({
      addedProducts: products,
    });
    console.log("this.props inside component did mount", this.props);
    // getting cart from DB
  }

  handleClick(product) {
    this.props.deleteProduct(product);
  }

  handleClearCartClick() {
    this.props.isLoggedIn
      ? this.props._clear_loggedin_cart(this.props.userId)
      : this.props.clear_cart();
  }
  // changeClick(product, increase){
  //   this.props.changeQuantity(product,increase)
  // }

  render() {
    // add the checkout feacture
    let addedItems = this.props.addedProducts.length ? (
      (console.log("this.props.addedProducts", this.props.addedProducts),
      console.log("this.props", this.props),
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
                      <h5> {this.state.quantity} </h5>
                      <Button
                        size="sm"
                        onClick={() =>
                          this.changeClick(product.id, { increase: "increase" })
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
      <p>Nothing.</p>
    );

    return (
      <div className="container">
        <Button variant="primary">
          <Link className="linkedButton" to="/checkout">
            GIMME, GIMME, GIMME
          </Link>
        </Button>
        <div className="cart">
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
  console.log("state", state);
  return {
    isLoggedIn: !!state.auth.id,
    addedProducts: state.addedProducts,
    userId: state.auth.id
    // products: !state.auth.id
    //   ? this.props.getLoggedInCart()
    //   : state.addedProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedInCart: (id) => dispatch(getLoggedInCart(id)),
    clear_cart: () => dispatch(clear_cart()),
    // get Cart products only relies on state
    getCartProducts: () => dispatch(getCartProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    _clear_loggedin_cart: (id) => dispatch(_clear_loggedin_cart(id)),
    // changeQuantity: (product, increase) => dispatch(changeQuantity(product, increase))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
