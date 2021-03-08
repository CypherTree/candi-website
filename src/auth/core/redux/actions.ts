import { Dispatch } from "redux";

import { LoginDispatchTypes, Types } from "./types";

import axios from "axios";
import { getCurrentSessionTokens } from "../services/session";

import { toast } from "react-toastify";

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
  SET_REGISTER_ERROR,
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

    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login/`, {
        email: username,
        password,
      })
      .then(async (response) => {
        const { access: accessToken, refresh: refreshToken } = response.data;

        await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
          .catch((err) => console.log("--- erro", err));

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

export const GetUserData = (
  accessToken: string,
  refreshToken: string
) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
  console.log("GET USER DATA was called. ");

  await axios
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
    .catch((err) => {
      console.log("--- erro", err);

      // if (err.response && err.response.status === 401) {
      //   console.log("--- yes --- error is 401.", refreshToken);
      //   // if (refreshToken) {
      //   // dispatch(GetNewToken(refreshToken));
      //   // }
      // }
    });
};

export const GetNewToken = (
  refreshToken: string,
  setShouldReload: any
) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
  toast.success("reached here");
  console.log("==== get new token api was called ====", refreshToken);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // let history = useHistory();x
  await axios
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
      toast.success("Login info updated");
      window.location.href = "/dashboard";
      // history.push("/dashboard");
      setShouldReload(true);
      console.log("==== got new data ===");
    })
    .catch((err) => {
      localStorage.clear();
      toast.error("Logging out");
      console.log("refresh token api failed");
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
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/register/`,
        registerData
      )
      .then(async (response) => {
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

        await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
          .catch((err) => console.log("--- erro", err));

        dispatch({
          type: SET_AUTHENTICATED,
          payload: {
            isAuthenticated: true,
            accessToken,
            refreshToken,
          },
        });
      })

      .catch((err: any) => {
        console.log("error in axios API  -> ", err.response.data.message);

        // TODO: OTP error message change
        dispatch({
          type: SET_REGISTER_ERROR,
          payload: {
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data.otp,
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
