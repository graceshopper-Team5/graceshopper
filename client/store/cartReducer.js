import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const LOGIN_ADD_TO_CART = "LOGIN_ADD_TO_CART";
const LOGIN_GET_CART = "LOGIN_GET_CART";
const CLEAR_CART = "CLEAR_CART";
const CLEAR_LOGGEDIN_CART = "CLEAR_LOGGEDIN_CART";


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

 export const change_Quantity = (product) => {
  return {
    type: CHANGE_QUANTITY,
    product,
  };
};

export const login_add_to_cart = (cart) => {
  return {
    type: LOGIN_ADD_TO_CART,
    cart
  }
}

export const login_get_cart = (cart) => {
  return {
    type: LOGIN_GET_CART,
    cart
  }
}

export const clear_cart = () => {
  return {
  type: CLEAR_CART,
}
}

export const clear_loggedin_cart = (id) => {
  return {
    type: CLEAR_LOGGEDIN_CART,
    id
  }
}

//THUNKS
export const loginChangeQuantity = (id, update) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/cart`, update, 
      { headers: {
        'Authorization': localStorage.getItem('token'),
       
      }
    })
      dispatch(change_Quantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// THUNK for getting logged in user's CART
export const getLoggedInCart = () => {
return async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/cart`, 
    { headers: {
      'Authorization': localStorage.getItem('token'),
     
    }
  });
    dispatch(addToCart(data));
  } catch (err) {
    console.log(err)
  }
}
}


// THUNK for modifying logged in user's Cart
export const loginAddingToCart = (addedProduct) =>{
  return async (dispatch) =>{
    try{
      // changing and fetching the cart
      const {data} = await axios.post(`/api/cart`, addedProduct, 
      { headers: {
        'Authorization': localStorage.getItem('token'),
       
      }
    })
      // entire cart we pulled on 73-77 of user api route
      dispatch(addToCart(data));
    }catch(err){
      console.log(err)
    }
  }
}

export const _clear_loggedin_cart = () => {
  return async (dispatch) => {
    try {
     await axios.delete(`/api/cart`, 
     { headers: {
       'Authorization': localStorage.getItem('token'),
      
     }
   });
      dispatch(clear_cart());
    } catch (err) {
      console.log(err);
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
    case CHANGE_QUANTITY:
      return state.map((product) => (product.id === action.product.id ? action.product : product));
  // re-distribute the data in the cart onto the state
  // take dispatched data and set to state
    case LOGIN_ADD_TO_CART:
      return [...state, action.cart];
    case LOGIN_GET_CART:
      return [...state, action.cart];
    case CLEAR_CART:
      state = [];
      return state;
    case CLEAR_LOGGEDIN_CART:
      state = [];
      return state;
    default:
      return state;
  }
}
