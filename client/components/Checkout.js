import React from "react";
import { connect } from "react-redux";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Checkout extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="2">
              <Card style={{ width: "18rem" }} className="text-center">
                <Card.Img
                  variant="top"
                  src="https://c.tenor.com/gUc8oy81HkgAAAAM/thats-all-folks-ending.gif"
                />
                <Card.Body>
                  <Card.Title>Order confirmation.</Card.Title>
                  <Card.Text>Thank you for shopping with us.</Card.Text>
                  <Button variant="primary">
                    <Link className="linkedButton" to="/products">
                      Back to home
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default connect(null, null)(Checkout);
