import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/SignUp';
import {me} from './store'
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <main>
        
        </main>
        {isLoggedIn ? (
          // when user is logged in
          <Switch>
            <Route path="/cart" component={Cart} />
              {/* should render all products */}
              {/* <Route exact path="/home" component={Home} /> */}
            <Route path="/home" component={Products} />
            <Route exact path="/" component={Products} />
            <Route exact path="/products" component={Products} />
            {/* render single product view */}
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/checkout" component={Checkout} />
            {/* <Redirect to="/home" /> */}

          </Switch>
        ) : (
          // when user is not logged in
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route exact path="/" component={Products} />
            <Route exact path="/products" component={Products} />
            {/* render single product view */}
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

