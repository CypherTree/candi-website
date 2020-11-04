import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
const reducers = combineReducers({ auth: authReducer });
const composeEnhancers = composeWithDevTools({});
const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
