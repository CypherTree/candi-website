import { Dispatch } from "redux";

import {
  LoginDispatchTypes,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
  SET_ACCESS_TOKEN,
  FORGOT_PASSWORD,
} from "./authTypes";

import {
  SET_AUTHENTICATED,
  SET_USERDATA,
  SET_LOGIN_ERROR,
} from "../auth/authTypes";

import axios from "axios";

export const LoginUser = (username: string, password: string) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  console.log("action called", username, password);
  let errorMessage;
  try {
    dispatch({
      type: LOGIN_USER,
      payload: {
        username,
        password,
      },
    });
    // ..
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login/`, {
        email: username,
        password,
      })
      .then((response) => {
        const { access: accessToken, refresh: refreshToken } = response.data;
        console.log("----- data from request ------", accessToken);
        dispatch({
          type: SET_AUTHENTICATED,
          payload: {
            isAuthenticated: true,
            accessToken,
            refreshToken,
          },
        });
      })
      .catch((err) => {
        console.log("--- error ---", err.message);
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
  console.log("action logout called");
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
    // ..
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
    // ..
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
      // const { access: accessToken, refresh: refreshToken } = response.data;
      const { data: userData } = response.data;
      console.log("-*********---- data from request ------", userData);
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
      console.log("--- erro", err.message);
    });
};

export const ForgotPassword = (email: string) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  console.log("forgot password was called.", email);

  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/forgot-password/`, {
      email,
    })
    .then((response: any) => {
      console.log("------ response from api ", response.data);
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          success: true,
          message: "Password reset link sent. Check your email.",
        },
      });
    })
    .catch((err) => {
      // localStorage.clear();
      dispatch({
        type: FORGOT_PASSWORD,
        payload: {
          success: false,
          message: "Password reset could not be sent",
        },
      });
      console.log("--- erro", err.message);
    });
};

export const ResetPassword = (token: string, password: string) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  console.log("reset password was called.", token, password);

  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/reset-password/`, {
      token,
      password,
    })
    .then((response: any) => {
      console.log("------ response from api ", response.data);
      if (response.data.status === "success") {
        // password has been reset
        dispatch({
          type: RESET_PASSWORD,
          payload: {
            success: true,
            message: "Password successfully reset.",
          },
        });
      } else {
        // password could not be reset
        console.log("--- error was called");
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
      // localStorage.clear();
      console.log("--- error", err.message);
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          success: false,
          message: "Some error occoured. Please retry ",
        },
      });
    });
};
