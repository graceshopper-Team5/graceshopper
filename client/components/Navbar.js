import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, userName }) => (
  <div>
    <a href="https://cooltext.com">
      <img
        src="https://images.cooltext.com/5545664.png"
        width="535"
        height="67"
        alt="MOVIE  PROPS"
      />
    </a>
    <nav>
      {isLoggedIn ? (
        <div>
          <div className="linksInNav">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">All products</Link>
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
          <div className="grid Title">
          <h5> Welcome, {userName}!</h5>
          </div>
        </div>
      ) : (
        <div>
          <div className="linksInNav">
            {/* The navbar will show these links before you log in */}
            <Link to="/products">All products</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userName: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
