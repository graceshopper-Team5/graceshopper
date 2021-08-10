import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

export class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="grid Title">
          {this.props.isLoggedIn ? (
            <div>
              <h1>Welcome, {this.props.userName}!</h1>
            </div>
          ) : (
            <div>
              <h1>Welcome, Guest!</h1>
            </div>
          )}
        </div>
        <div className="grid">
          <Container>
            <Row className="justify-content-md-center">
              <Col xs lg="2">
                <Card style={{ width: "30rem" }} className="text-center">
                  <Card.Img
                    variant="top"
                    src="https://mlsvc01-prod.s3.amazonaws.com/12aa0d2a001/8b7082bc-373e-426f-9650-a9fcbb38540b.png?ver=1477421008000"
                  />
                  <Card.Body>
                    <Button variant="primary">
                      <Link className="linkedButton" to="/products">
                        Go to Props
                      </Link>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userName: state.auth.username,
  };
};

export default connect(mapState)(Home);
