import axios from 'axios'

// ACTION TYPE
const SET_USERS = 'SET_USERS'

//ACTION CREATOR
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
}

//THUNK
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products/')
      const { data } = response
      dispatch(setUsers)
    } catch (err) {
      console.log (err)
    }
  }
}

// REDUCER
const initialState = []
export default function usersReducer (state = initialState, action ) {
  switch(action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
