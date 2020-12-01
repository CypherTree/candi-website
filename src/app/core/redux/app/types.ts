export const SET_LOADING = "SET_LOADING";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

export interface SetLoadingPayload {
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

export type AppDispatchTypes = SetLoadingPayload | SetAuthenticated;
