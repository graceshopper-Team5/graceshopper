import React from "react";
import { connect } from "react-redux";
import { getCartProducts, deleteProduct , changeQuantity, getLoggedInCart} from "../store/cartReducer";
import { Card, Button } from "react-bootstrap";
import Routes from "../Routes";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this);
    // this.changeClick = this.changeClick.bind(this)
  }

  componentDidMount() {
    // boolean different thunk if user is logged in
    // gets the products if the user is not logged in
    this.props.getCartProducts();
    // getting cart from DB
    this.props.getLoggedInCart();
  }

  handleClick(product) {
    this.props.deleteProduct(product);
  }
  // changeClick(product, increase){
  //   this.props.changeQuantity(product,increase)
  // }

  render() {
    //add the checkout feacture
    let addedItems = this.props.products.length ? (
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
              <Button onClick ={() => this.changeClick(product.id, {increase:"increase"})} >increase</Button>
              <Button
                variant="primary"
                onClick={() => this.handleClick(product)}
              >
                Remove
              </Button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Button variant="primary">GIMME, GIMME, GIMME</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // taking state and products
  console.log("state", state);
  return {
    products: state.addedItems,
    isLoggedIn: !!state.auth.id
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
  getLoggedInCart: (id) => dispatch(getLoggedInCart(id)),
    // get Cart products only relies on state
    getCartProducts: () => dispatch(getCartProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    // changeQuantity: (product, increase) => dispatch(changeQuantity(product, increase))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
