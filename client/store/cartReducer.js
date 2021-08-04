import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

const initState = [];
export default function cartReducer(state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];
    default:
      return state;
  }
}

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
