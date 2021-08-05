import React from "react";
import { connect } from "react-redux";
import { getProduct } from "../store/singleProdReducer";
import { Card, Button } from "react-bootstrap";
import { addToCart } from "../store/cartReducer";

export class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // retrieve the productId from route
    const productId = this.props.match.params.id;
    // pass the Id to dispatch the thunk
    this.props.getProduct(productId);
  }
  handleClick(product) {
    this.props.addToCart(product);
  }
  render() {
    // o: you can destructure this
    const product = this.props.product;
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={product.imageUrl} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.price}</Card.Text>
            <Card.Text>{product.movieTitle}</Card.Text>
            <Card.Text>{product.movieYear}</Card.Text>
            <Card.Text>{product.description}</Card.Text>
            <Button variant="primary" onClick={() => this.handleClick(product)}>
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProdReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct(id)),
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapState, mapDispatch)(Product);
