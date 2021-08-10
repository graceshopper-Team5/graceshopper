import React from "react";
import { connect } from "react-redux";
import { getProduct } from "../store/singleProdReducer";
import { Card, Button , Container, Row, Col} from "react-bootstrap";
import { addToCart, loginAddingToCart } from "../store/cartReducer";

export class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.logInHandleClick = this.logInHandleClick.bind(this);
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
  logInHandleClick(userId, product) {
    this.props.loginAddingToCart(userId, product);
  }
  render() {
    // o: you can destructure this
    const product = this.props.product;
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price / 100}</Card.Text>
                  <Card.Text>{product.movieTitle}</Card.Text>
                  <Card.Text>{product.movieYear}</Card.Text>
                  <Card.Text>{product.description}</Card.Text>
                  {this.props.isLoggedIn ? (
                    <Button
                      onClick={() => this.logInHandleClick(this.props.userId, product)}
                    >
                    Add to Cart
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProdReducer,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(getProduct(id)),
    addToCart: (product) => dispatch(addToCart(product)),
    loginAddingToCart: (userId, product) =>
      dispatch(loginAddingToCart(userId, product)),
  };
};

export default connect(mapState, mapDispatch)(Product);
