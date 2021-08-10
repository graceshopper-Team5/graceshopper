import axios from 'axios'

// ACTION TYPE
const SET_USERS = 'SET_USERS'
const CREATE_USER = 'CREATE_USER'

//ACTION CREATOR
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
}

export const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user
  }
}

//THUNK
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/users/', 
        { headers: {
          'Authorization': localStorage.getItem('token'),
         
        }
      })
      
      const data  = response.data
      dispatch(createUser(data))
    } catch (err) {
      console.log (err)
    }
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/users/', user, 
      { headers: {
        'Authorization': localStorage.getItem('token'),
       
      }
    })
      const data  = response.data
      dispatch(_createUser(data))
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
    case CREATE_USER:
      return [...state, action.user]
    default:
      return state
  }
}
