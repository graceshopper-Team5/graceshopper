import React from "react";
import { connect } from "react-redux";
import { getCartProducts, deleteProduct , changeQuantity} from "../store/cartReducer";
import { Card, Button } from "react-bootstrap";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.State ={
      quanity: 1
    }
    this.handleClick = this.handleClick.bind(this);
    this.changeClick = this.changeClick.bind(this)
  }

  componentDidMount() {
    this.props.getCartProducts();
  }

  handleClick(product) {
    this.props.deleteProduct(product);
  }
  changeClick(product, increase){
    this.props.changeQuantity(product,increase)
  }

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
  console.log("state", state);
  return {
    products: state.addedProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartProducts: () => dispatch(getCartProducts()),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    changeQuantity: (product, increase) => dispatch(changeQuantity(product, increase))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
