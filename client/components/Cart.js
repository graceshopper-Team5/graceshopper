import React from "react";
import { connect } from "react-redux";
import { getProduct } from "../store/singleProdReducer";

export class Cart extends React.Component {
  // render() {
  // return(
  //   <div>
  //   {console.log("you're in the cart")}
  //   <h1>YOU ARE IN THE CART</h1>
  //   </div>

  // )
  // }
  render() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);
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

              {/* <div className="add-remove">
                                  <Link to="/cart"><i className="material-icons">arrow_drop_up</i></Link>
                                  <Link to="/cart"><i className="material-icons">arrow_drop_down</i></Link>
                              </div> */}
              <button className="waves-effect waves-light btn pink remove">
                Remove
              </button>
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
export default connect(mapStateToProps)(Cart);
