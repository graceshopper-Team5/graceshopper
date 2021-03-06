import axios from "axios";

// ACTION TYPE
const SET_PRODUCT = "SET_PRODUCT";

//ACTION CREATOR
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

//THUNK -
export const getProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${id}`);

      const data = response.data;
      dispatch(setProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = [];
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
