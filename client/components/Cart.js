import React from "react";
import { connect } from "react-redux";
import {
  getCartProducts,
  deleteProduct,
  changeQuantity,
} from "../store/cartReducer";
import Checkout from "./Checkout";
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.State = {
      quanity: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    // this.changeClick = this.changeClick.bind(this)
  }

  componentDidMount() {
    this.props.getCartProducts();
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
                      <h5> 1* </h5>
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
      })
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
    // changeQuantity: (product, increase) => dispatch(changeQuantity(product, increase))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
