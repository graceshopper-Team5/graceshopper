import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {createUser} from '../store/usersReducer';

/**
 * COMPONENT
 */
const SignUp = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {/* o: you can use optional chaining here */}
        {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
        {error && error.response && <div> {error.response.data} </div>}
        {error?.response?.data}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate(username, email, password))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignUp)
