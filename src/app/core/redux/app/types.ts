export const SET_LOADING = "SET_LOADING";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const CHECK_DOMAIN_NAME = "CHECK_DOMAIN_NAME";
export const DOMAIN_CHECK_MESSAGE = "DOMAIN_CHECK_MESSAGE";

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: {
    isLoading: boolean;
  };
}

export interface SetAuthenticated {
  type: typeof SET_AUTHENTICATED;
  payload: {
    isAuthenticated: boolean;
  };
}

export interface CheckDomainName {
  type: typeof CHECK_DOMAIN_NAME;
  payload: {};
}

export interface DomainCheckMessage {
  type: typeof DOMAIN_CHECK_MESSAGE;
  payload: {
    domainCheckMessage: string;
  };
}

export type AppDispatchTypes =
  | SetLoading
  | SetAuthenticated
  | CheckDomainName
  | DomainCheckMessage;
