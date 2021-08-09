import React from "react";
import { connect } from "react-redux";
import {
  getCartProducts,
  deleteProduct,
  changeQuantity,
  getLoggedInCart,
  clear_cart,
  _clear_loggedin_cart
} from "../store/cartReducer";
import { Card, Button } from "react-bootstrap";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      quantity: 1,
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
      ? this.props.getLoggedInCart()
      : this.props.getCartProducts();
      this.setState({
        addedProducts: products
      })
    console.log("this.props inside component did mount", this.props);
    // getting cart from DB
  }

  handleClick(product) {
    this.props.deleteProduct(product);
  }

  handleClearCartClick() {
    this.props.clear_cart()
  }
  // changeClick(product, increase){
  //   this.props.changeQuantity(product,increase)
  // }

  render() {
    // add the checkout feacture
    let addedItems = this.props.products.length ? (
      (console.log("this.props.products", this.props.products),
      console.log("this.props", this.props),
      this.props.products.map((product) => {
        return (
          <li className="collection-item avatar" key={product.id}>
            <div className="item-img">
              <img src={product.imageUrl} alt={product.imageUrl} className="" />
            </div>
            <div className="item-desc">
              <span className="title">{product.name}</span>
              <p>{product.description}</p>
              <p>
                <b>Price: {product.price}$</b>
              </p>
              <Button
                onClick={() =>
                  this.changeClick(product.id, { increase: "increase" })
                }
              >
                increase
              </Button>
              <Button
                variant="primary"
                onClick={() => this.handleClick(product)}
              >
                Remove
              </Button>
              <Button 
              variant= "primary"
              onClick={() => this.handleClearCartClick()}
              >
                Clear Cart
              </Button>
            </div>
          </li>
        );
      }))
    ) : (
      <p>Nothing.</p>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Button variant="primary" onClick={() => this.handleClearCartClick()}>GIMME, GIMME, GIMME</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // taking state and products
  console.log("state", state);
  return {
    isLoggedIn: !!state.auth.id,
    products: state.addedProducts,
    // products: !state.auth.id
    //   ? this.props.getLoggedInCart()
    //   : state.addedProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedInCart: () => dispatch(getLoggedInCart()),
    clear_cart: () => dispatch(clear_cart()),
    // get Cart products only relies on state
    getCartProducts: () => dispatch(getCartProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    clear_loggedin_cart: (id) => dispatch(_clear_loggedin_cart(id)),
    // changeQuantity: (product, increase) => dispatch(changeQuantity(product, increase))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
