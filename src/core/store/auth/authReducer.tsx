import { CONSTANTS } from "../types";
import {
  LOGOUT_USER,
  SET_AUTHENTICATED,
  SET_LOGIN_ERROR,
  SET_USERDATA,
  SET_ACCESS_TOKEN,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
} from "./authTypes";

interface DefaultStateI {}

const defaultState: DefaultStateI = {
  isAuthenticated: false,
};

export const authReducer: any = (
  state: DefaultStateI = defaultState,
  action: any
) => {
  const { LOGIN_USER } = CONSTANTS;
  // const { payload } = action;
  console.log("inside reducers", action.payload);
  const { payload } = action;
  switch (action.type) {
    case LOGIN_USER: {
      console.log("state at login", state);
      console.log("******** auth at login", payload);
      return { ...state, ...payload };
    }

    case SET_AUTHENTICATED: {
      if (action.payload.isAuthenticated) {
        action.payload.accessToken &&
          localStorage.setItem("accessToken", action.payload.accessToken);
        action.payload.refreshToken &&
          localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
      console.log("-------- state at authenticated ", action.payload);
      return { ...state, ...payload };
    }

    case LOGOUT_USER: {
      localStorage.clear();
      console.log("-------- state after logout ");
      return { ...state, ...payload };
    }

    case SET_LOGIN_ERROR: {
      // localStorage.clear();
      console.log("-------- Login error  ");
      return { ...state, ...payload };
    }

    case SET_USERDATA: {
      // localStorage.clear();
      console.log("-------- Login error  ");
      return { ...state, ...payload };
    }

    case SET_ACCESS_TOKEN: {
      // localStorage.clear();
      console.log("A$$$$$$$$$$$$$$ access token", payload);
      localStorage.setItem("accessToken", payload.accessToken);
      return { ...state };
    }

    case FORGOT_PASSWORD: {
      return { ...state, ...payload };
    }

    case RESET_PASSWORD: {
      console.log("*************** password change", action.payload);
      return { ...state, ...payload };
    }

    default:
      return state;
  }
};
