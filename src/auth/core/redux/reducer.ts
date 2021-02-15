import { CONSTANTS } from "../../../app/core/redux/types";

import { Types } from "./types";

interface DefaultStateI {}

const defaultState: DefaultStateI = {
  isAuthenticated: false,
};

const {
  LOGOUT_USER,
  SET_AUTHENTICATED,
  SET_LOGIN_ERROR,
  SET_REGISTER_ERROR,
  SET_USERDATA,
  SET_ACCESS_TOKEN,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  CLEAR_STATE,
  REGISTER_SUCCESS,
  ACCEPT_POLICY_SUCCESS,
  EMAIL_VERIFICATION_SUCCESS,
} = Types;

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
        if (action.payload.rememberMe) {
          action.payload.accessToken &&
            localStorage.setItem("accessToken", action.payload.accessToken);
          action.payload.refreshToken &&
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        } else {
          action.payload.accessToken &&
            sessionStorage.setItem("accessToken", action.payload.accessToken);
          action.payload.refreshToken &&
            sessionStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      }
      return { ...state, ...payload };
    }

    case LOGOUT_USER: {
      localStorage.clear();
      sessionStorage.clear();
      return { ...state, ...payload };
    }

    case SET_LOGIN_ERROR: {
      return { ...state, ...payload };
    }

    case SET_REGISTER_ERROR: {
      console.log("payload recieved");
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

    case REGISTER_SUCCESS: {
      action.payload.accessToken &&
        localStorage.setItem("accessToken", action.payload.accessToken);
      action.payload.refreshToken &&
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      return { ...state, ...payload };
    }

    case ACCEPT_POLICY_SUCCESS: {
      return { ...state, ...payload };
    }

    case EMAIL_VERIFICATION_SUCCESS: {
      return { ...state, ...payload };
    }

    default:
      return state;
  }
};
