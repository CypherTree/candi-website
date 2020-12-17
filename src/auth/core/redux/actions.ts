import { Dispatch } from "redux";

import { LoginDispatchTypes, Types } from "./types";

import axios from "axios";

const {
  LOGIN_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
  SET_ACCESS_TOKEN,
  FORGOT_PASSWORD,
  CLEAR_STATE,
  ACCEPT_POLICY_SUCCESS,
  SET_AUTHENTICATED,
  SET_USERDATA,
  SET_LOGIN_ERROR,
  REGISTER_SUCCESS,
  EMAIL_VERIFICATION_SUCCESS,
} = Types;

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

export const AcceptPrivacyPolicy = (policyAccept: boolean) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  if (policyAccept === true) {
    dispatch({
      type: ACCEPT_POLICY_SUCCESS,
      payload: {
        policyAccept: true,
      },
    });
  }
};

interface RegisterData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  phone_number_extension: string;
  otp: string;
}

export const RegisterUser = (registerData: RegisterData) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  try {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/register/`,
        registerData
      )
      .then((response) => {
        console.log("response of axios", response.data);
        const { message } = response.data;
        const {
          access: accessToken,
          refresh: refreshToken,
        } = response.data.data;
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            accessToken,
            refreshToken,
            success: message,
          },
        });
      })
      .catch((err: any) => {
        console.log("error in axios API  -> ", err.response.data.message);
        dispatch({
          type: SET_LOGIN_ERROR,
          payload: {
            error: err.response.data.message,
          },
        });
      });
  } catch (e) {
    console.log("error in try", e);
  }
};

export const EmailVerification = (token: string) => async (
  dispatch: Dispatch<LoginDispatchTypes>
) => {
  try {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/verify-email?token=${token}`
      )
      .then((response) => {
        console.log("response of axios", response.data);
        const { message } = response.data;

        dispatch({
          type: EMAIL_VERIFICATION_SUCCESS,
          payload: {
            emailVerificationMessage: message,
          },
        });
      })
      .catch((err: any) => {
        console.log("error in axios API  -> ", err.response);
        dispatch({
          type: SET_LOGIN_ERROR,
          payload: {
            error: err.response.data.detail,
          },
        });
      });
  } catch (e) {
    console.log("error in try", e);
  }
};
