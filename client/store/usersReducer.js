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
      const response = await axios.get('/api/users/')
      console.log("this is response from thunk", response)
      const data  = response.data
      dispatch(setUsers(data))
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
