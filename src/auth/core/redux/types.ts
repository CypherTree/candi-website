export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_LOADING = "SET_LOADING";
export const SET_USERDATA = "GET_USERDATA";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const CLEAR_STATE = "CLEAR_STATE";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const ACCEPT_POLICY_SUCCESS = "ACCEPT_POLICY_SUCCESS";
export const EMAIL_VERIFICATION = "EMAIL_VERIFICATION";
export const EMAIL_VERIFICATION_SUCCESS = "EMAIL_VERIFICATION_SUCCESS";

export type LoginData = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export interface LoginUser {
  type: typeof LOGIN_USER;
  payload: LoginData;
}

export type RegisterUserData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  phone_number_extension: string;
  otp: string;
};

export interface RegisterUser {
  type: typeof REGISTER_USER;
  payload: RegisterUserData;
}

export interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
    success: string;
  };
}

export interface RegisterFail {
  type: typeof REGISTER_FAIL;
  payload: {
    message: string;
  };
}

export interface LogoutUser {
  type: typeof LOGOUT_USER;
}

export interface SetAuthenticated {
  type: typeof SET_AUTHENTICATED;
  payload: {
    isAuthenticated: boolean;
    accessToken?: string;
    refreshToken?: string;
    rememberMe?: boolean;
  };
}

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: {
    isLoading: boolean;
  };
}

export interface SetUserData {
  type: typeof SET_USERDATA;
  payload: {
    userData: any;
  };
}

export interface SetLoginError {
  type: typeof SET_LOGIN_ERROR;
  payload: {
    error: string;
  };
}

export interface SetAccessToken {
  type: typeof SET_ACCESS_TOKEN;
  payload: {
    accessToken: string;
  };
}

export interface ResetPassword {
  type: typeof RESET_PASSWORD;
  payload: {
    success: boolean;
    message: string;
  };
}

// export interface RegisterUser {
//   type: typeof REGISTER_USER;
//   payload: {};
// }

export interface ForgotPassword {
  type: typeof FORGOT_PASSWORD;
  payload: {
    success: boolean;
    message: string;
  };
}

export interface ClearState {
  type: typeof CLEAR_STATE;
  payload: {};
}

export interface AcceptPolicySuccess {
  type: typeof ACCEPT_POLICY_SUCCESS;
  payload: {
    policyAccept: boolean;
  };
}

export interface EmailVerification {
  type: typeof EMAIL_VERIFICATION;
  payload: {
    token: string;
  };
}

export interface EmailVerificationSuccess {
  type: typeof EMAIL_VERIFICATION_SUCCESS;
  payload: {
    emailVerificationMessage: string;
  };
}

export type LoginDispatchTypes =
  | LoginUser
  | LogoutUser
  | SetAuthenticated
  | SetLoading
  | SetUserData
  | SetLoginError
  | SetAccessToken
  | ResetPassword
  | ForgotPassword
  | ClearState
  | RegisterUser
  | RegisterSuccess
  | RegisterFail
  | AcceptPolicySuccess
  | EmailVerification
  | EmailVerificationSuccess;
