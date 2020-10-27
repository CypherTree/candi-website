import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
const reducers = combineReducers({ auth: authReducer });
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))

  // window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
);

// import { createStore, combineReducers, applyMiddleware, compose } from ‘redux’
// import thunk from ‘redux-thunk’
// // import userReducer from ‘./reducers/userReducer’
// // import uiReducer from ‘./reducers/uiReducer’
// // const initialState = {};
// // const middleware = [thunk];
// //this is for redux devtool purpose
// declare global {
// interface Window {
//  __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
// }
// }
// const reducer = combineReducers({
//  user: userReducer,//user key ma store gareko
//  UI: uiReducer
// });
// const store = createStore(reducer, initialState, compose(applyMiddleware(…middleware), (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) as any));
// export default store;
