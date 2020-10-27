//in useActions.ts file
import { CONSTANTS } from "./types";

import axios from "axios";

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  const { LOGIN_USER } = CONSTANTS;

  dispatch({ type: LOGIN_USER });

  // axios.post(‘login’, userData)
  //  .then((res) => {
  //  const token = `Bearer ${res.data.token}`;
  //  localStorage.setItem(‘token’, `Bearer ${res.data.token}`);//setting token to local storage
  //  axios.defaults.headers.common[‘Authorization’] = token;//setting authorize token to header in axios
  //  dispatch(getUserData());
  //  dispatch({ type: CLEAR_ERRORS });
  //  console.log(‘success’);
  //  history.push(‘/’);//redirecting to index page after login success
  // })
  //  .catch((err) => {
  //  console.log(err);
  //  dispatch({
  //  type: SET_ERRORS,
  //  payload: err.response.data
  // });
  // });
};
//for fetching authenticated user information
// export const getUserData = () => (dispatch: any) => {
//  dispatch({ type: LOADING_USER });
//  axios.get(‘/user’)
//  .then(res => {
//  console.log(‘user data’, res.data);
// dispatch({
//  type: SET_USER,
//  payload: res.data
// });
// }).catch(err => {
//  console.log(err);
// });
// }
// export const logoutUser = () => (dispatch: any) => {
//  localStorage.removeItem(‘token’);
//  delete axios.defaults.headers.common[‘Authorization’]
//  dispatch({
//  type: SET_UNAUTHENTICATED
// });
//  window.location.href = ‘/login’;//redirect to login page
// };
// NOTE:your server must return response like as follow for getting the authenticated user information getUserData function must return response as
// {
//  “credentials”: {
//  “createdAt”: “2020–01–30T10:29:44.898Z”,
//  “email”: “bikash@gmail.com”,
//  “userId”: “D4hCBB4RcAdTjawNCQ0K4ItED563”
//  }
// }
// loginUser function must return token after successful login as:
// {
//     "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1OTc0MmQyNjlhY2IzNWZiNjU3YzBjNGRkMmM3YjcyYWEzMTRiNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGFya2l0LTI3YTQ4IiwiYXVkIjoicGFya2l0LTI3YTQ4IiwiYXV0aF90aW1lIjoxNTgwNjM3MzgyLCJ1c2VyX2lkIjoiRDRoQ0JCNFJjQWRUamF3TkNRMEs0SXRFRDU2MyIsInN1YiI6IkQ0aENCQjRSY0FkVGphd05DUTBLNEl0RUQ1NjMiLCJpYXQiOjE1ODA2MzczODIsImV4cCI6MTU4MDY0MDk4MiwiZW1haWwiOiJwYWRhbTEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwYWRhbTEyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.M0hTKqNb_0_3qmqS7xiI2I3mDpm6_gaAEIzRBydiu89pzaBJPXZ1BngdLQeJ2_JOh6GJBHDDeX52yM-DZdHoK6cC93ugqMjz7bzegf5YJzdYEtBPHFKvaDUQEgzgGhGbU_jl5xL09uIixPgOChw3zWbVAbvj4ZjJrT4u5aC96txhDA9gMPtRLq-9VoL4SQTRjOc-_vP08SylWP1oklMgsCfEGFCk81zcEsGEHfHwH_dIcj208G483lzD29Ghqmo3nKGp6u3eeXLxoyop8hKQsJUbvJK9zZmobfqZfghuDgiMj5_LqImmTeQR6jw7_S1NK0uDMcQl3G0lxezvS0n53w"
// }
//in userReducer.ts
// import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from ‘../types’
// const initialState = {
//  authenticated: false,
//  credentials: {},
//  loading: false
// }

// export default function (state = initialState, action:any) {
//  switch (action.type) {
//  case SET_AUTHENTICATED:
//  return {
//  …state,
//  authenticated: true
//  };
//  case SET_UNAUTHENTICATED:
//  return initialState;
//  case SET_USER:
//  return {
//  authenticated: true,
//  loading:false,
//  …action.payload
//  };
// case LOADING_USER:
//  return {
//  …state,
//  loading: true
//  };
//  default:
//  return state;
// }
// }
//in uiReducer.ts
// import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from ‘../types’
// const initialState = {
//  loading: false,
//  errors: null
// }
// export default function (state = initialState, action:any) {
// switch (action.type) {
//  case SET_ERRORS:
//  return {
//  …state,
//  loading: false,
//  errors: action.payload
//  };
//  case CLEAR_ERRORS:
//  return {
//  …state,
//  loading: false,
//  errors: null
// };
//  case LOADING_UI:
//  return {
//  …state,
//  loading: true
//  }
//  default:
//  return state;
// }
// }

//in store.ts
// import { createStore, combineReducers, applyMiddleware, compose } from ‘redux’
// import thunk from ‘redux-thunk’
// import userReducer from ‘./reducers/userReducer’
// import uiReducer from ‘./reducers/uiReducer’
// const initialState = {};
// const middleware = [thunk];
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
