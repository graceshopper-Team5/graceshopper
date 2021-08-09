import React from 'react'
import {connect} from 'react-redux'
import { getCartProducts } from '../store/cartReducer';
import {Button, Card, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export class Checkout extends React.Component {
  /* confirmation message:
  <h4> Thank you so much for your order! Please check your email for a receipt and confirmation number to ensure your recent purchase. <h4>

  - should be either a return to home page (allproducts view) button, or a back button that guides user back home - Link here
*/
  render(){
    return(
      <div >
       <Container>
         <Row className="justify-content-md-center">
         <Col xs lg="2">
         <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://c.tenor.com/gUc8oy81HkgAAAAM/thats-all-folks-ending.gif" />
          <Card.Body>
            <Card.Title>Order confirmation.</Card.Title>
            <Card.Text>
            Thank you for shopping with us.
            </Card.Text>
            <Button variant="primary"> <Link  className="linkedButton" to='/products'>Back to home</Link> </Button>
          </Card.Body>
        </Card>
        </Col>
         </Row>
       </Container>
        
        
      </div>
      
    )
  }


}
export default Checkout
// export default connect(Checkout)
