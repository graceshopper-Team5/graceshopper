import axios from 'axios'

// ACTION TYPE
const SET_PRODUCTS = 'SET_PRODUCTS'

//ACTION CREATOR
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  }
}


//THUNK -
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products/')
      const { data } = response
      dispatch(setProducts)
    } catch (err) {
      console.log (err)
    }
  }
}

// REDUCER
const initialState = []
export default function productsReducer (state = initialState, action) {
  switch(action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
