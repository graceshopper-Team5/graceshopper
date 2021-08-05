import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT"
const INCREMENT_PRODUCT = "INCREMENT_PRODUCT"

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};



export const getCartProducts = (products) => {
  return {
    type: GET_CART_PRODUCTS,
    products,
  };
};
 export const deleteProduct = (product) =>{
   return {
     type: DELETE_PRODUCT, 
     product
   }
 }

 export const increment_Product = (product) => {
  return {
    type: INCREMENT_PRODUCT,
    product,
  };
};

//THUNKS
export const addQuantity = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/products/users/${id}`)
      dispatch(increment_Product(data))
    } catch (error) {
      console.log(error)
    }
  }
}


const initState = [];
export default function cartReducer(state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];
    case GET_CART_PRODUCTS:
      return state;
    case DELETE_PRODUCT:
      return [...state.filter(product => product.id !== action.product.id)]
    case INCREMENT_PRODUCT:
      return state.map((product) => (product.id === action.product.id ? action.product : product))
    default:
      return state;
  }
}

// o: before done make sure to remove unused code
// //INSIDE HOME COMPONENT
// if (action.type === ADD_TO_CART) {

//   let addedItem = action.id;
//   //check if the action id exists in the addedItems
//   let existed_item = state.addedItems.find(
//     (product) => action.id === product.id
//   );
//   if (existed_item) {
//     addedItem.quantity += 1;
//     return {
//       ...state,
//       total: state.total + addedItem.price,
//     };
//   } else {
//     addedItem.quantity = 1;
//     //calculating the total
//     let newTotal = state.total + addedItem.price;

//     return {
//       ...state,
//       addedItems: [...state.addedItems, addedItem],
//       total: newTotal,
//     };
//   }
// } else {
//   return state;
// }
