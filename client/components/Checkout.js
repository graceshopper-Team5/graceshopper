import React from 'react'
import {connect} from 'react-redux'
import { getCartProducts } from '../store/cartReducer';

export class Checkout extends React.Commponent {
  /* confirmation message:
  <h4> Thank you so much for your order! Please check your email for a receipt and confirmation number to ensure your recent purchase. <h4>

  - should be either a return to home page (allproducts view) button, or a back button that guides user back home - Link here
*/


}

export default connect(Checkout)
