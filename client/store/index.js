import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import usersReducer from "./usersReducer";
import productsReducer from "./productsreducer";
import singleProdReducer from "./singleProdReducer";
import cartReducer from "./cartReducer";
import {loadState, saveState} from '../localStorage'

const reducer = combineReducers({
  auth,
  usersReducer,
  productsReducer,
  singleProdReducer,
  addedProducts: cartReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const persistedState = loadState();

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
  saveState({
    addedProducts: store.getState().addedProducts
  });
});

export default store;
export * from "./auth";
