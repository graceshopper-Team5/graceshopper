import axios from "axios";

// ACTION TYPE
const SET_PRODUCTS = "SET_PRODUCTS";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";

//ACTION CREATOR
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const change_Quantity = (product) => {
  return {
    type: CHANGE_QUANTITY,
    product,
  };
};

//THUNK
export const loginChangeQuantity = (id, update, history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/products/${id}/update`, update)
    console.log("HERE IS DATA", data)
      dispatch(change_Quantity(data))
      history.push(`/cart`)
      history.push(`/cart`)
    } catch (error) {
      console.log(error)
    }
  }
}

//THUNK -
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/products");
      const data = response.data;
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = [];
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case CHANGE_QUANTITY:
      return state.map((product) => (product.id === action.product.id ? action.product : product))
    default:
      return state;
  }
}
