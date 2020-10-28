import { Dispatch } from "redux";

import {
  LoginDispatchTypes,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
  SET_ACCESS_TOKEN,
  FORGOT_PASSWORD,
  CLEAR_STATE,
} from "./authTypes";

import {
  SET_AUTHENTICATED,
  SET_USERDATA,
  SET_LOGIN_ERROR,
} from "../auth/authTypes";

import axios from "axios";

export const LoginUser = (
  username: string,
  password: string,
  rememberMe: boolean
) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
  try {
    dispatch({
      type: LOGIN_USER,
      payload: {
        username,
        password,
        rememberMe,
      },
    });

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login/`, {
        email: username,
        password,
      })
      .then((response) => {
        const { access: accessToken, refresh: refreshToken } = response.data;

        dispatch({
          type: SET_AUTHENTICATED,
          payload: {
            isAuthenticated: true,
            accessToken,
            refreshToken,
            rememberMe,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_LOGIN_ERROR,
          payload: {
            error: "Invalid username or password",
          },
        });
      });
  } catch (e) {}
};

export const LogoutUser = () => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  try {
    dispatch({
      type: LOGOUT_USER,
    });
    dispatch({
      type: SET_AUTHENTICATED,
      payload: {
        isAuthenticated: false,
      },
    });
  } catch (e) {}
};

export const SetAuthenticated = (isAuthenticated: boolean) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  try {
    dispatch({
      type: SET_AUTHENTICATED,
      payload: {
        isAuthenticated,
      },
    });
  } catch (e) {}
};

export const GetUserData = (accessToken: string) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile/`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    .then((response: any) => {
      const { data: userData } = response.data;

      dispatch({
        type: SET_USERDATA,
        payload: {
          userData,
        },
      });
    })
    .catch((err) => console.log("--- erro", err.message));
};

export const GetNewToken = (
  accessToken: string,
  refreshToken: string
) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login/refresh/`, {
      refresh: refreshToken,
    })
    .then((response: any) => {
      const { access: accessToken } = response.data;
      dispatch({
        type: SET_ACCESS_TOKEN,
        payload: {
          accessToken,
        },
      });
    })
    .catch((err) => {
      localStorage.clear();
    });
};

export const ForgotPassword = (email: string) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/forgot-password/`, {
      email,
    })
    .then((response: any) => {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          success: true,
          message: "Password reset link sent. Check your email.",
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          success: false,
          message: "Password reset failed. Please retry.",
        },
      });
    });
};

export const ClearState = () => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  dispatch({
    type: CLEAR_STATE,
    payload: {},
  });
};

export const ResetPassword = (token: string, password: string) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/reset-password/`, {
      token,
      password,
    })
    .then((response: any) => {
      if (response.data.status === "success") {
        dispatch({
          type: RESET_PASSWORD,
          payload: {
            success: true,
            message: "Password successfully reset.",
          },
        });
      } else {
        dispatch({
          type: RESET_PASSWORD,
          payload: {
            success: false,
            message: "Some error occoured. Please retry ",
          },
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          success: false,
          message: "Some error occoured. Please retry ",
        },
      });
    });
};
