import { CONSTANTS } from "../types";
import {
  LOGOUT_USER,
  SET_AUTHENTICATED,
  SET_LOGIN_ERROR,
  SET_USERDATA,
  SET_ACCESS_TOKEN,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  CLEAR_STATE,
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

  const { payload } = action;
  switch (action.type) {
    case LOGIN_USER: {
      return { ...state, ...payload };
    }

    case SET_AUTHENTICATED: {
      if (action.payload.isAuthenticated) {
        action.payload.accessToken &&
          localStorage.setItem("accessToken", action.payload.accessToken);
        action.payload.refreshToken &&
          localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
      return { ...state, ...payload };
    }

    case LOGOUT_USER: {
      localStorage.clear();
      return { ...state, ...payload };
    }

    case SET_LOGIN_ERROR: {
      return { ...state, ...payload };
    }

    case SET_USERDATA: {
      return { ...state, ...payload };
    }

    case SET_ACCESS_TOKEN: {
      localStorage.setItem("accessToken", payload.accessToken);
      return { ...state };
    }

    case FORGOT_PASSWORD: {
      return { ...state, ...payload };
    }

    case RESET_PASSWORD: {
      return { ...state, ...payload };
    }

    case CLEAR_STATE: {
      return { isAuthenticated: false };
    }

    default:
      return state;
  }
};
