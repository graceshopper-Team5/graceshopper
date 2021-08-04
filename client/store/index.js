import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import usersReducer from "./usersReducer";
import productsReducer from "./productsreducer";
import singleProdReducer from "./singleProdReducer";
import cartReducer from "./cartReducer";

const reducer = combineReducers({
  auth,
  usersReducer,
  productsReducer,
  singleProdReducer,
  cartReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
