import React from 'react'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


export class Home extends React.Component {
  constructor(props) {
    super(props);

  }




  render() {
    return (
      <div className="grid">
        {this.props.isLoggedIn ? (
        <div>
          
          <h1>Welcome, userName here</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome, Guest!</h1>
        </div>
      )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return{
    getProducts: () => dispatch(getProducts()),
    addToCart: (product) => dispatch(addToCart(product)),
    loginAddingToCart: (userId, product) => dispatch(loginAddingToCart(userId, product))
  }
}



export default connect(mapState, mapDispatch)(Products);
