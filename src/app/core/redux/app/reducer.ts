import { SET_LOADING } from "../../../../auth/core/redux/types";
import {
  SET_AUTHENTICATED,
  DOMAIN_CHECK_MESSAGE,
  NEW_ORGANISATION_CREATE,
  SET_PLAN_TO_ORGANISATION,
} from "./types";

interface DefaultStateI {
  isLoading: boolean;
}

const defaultState: DefaultStateI = {
  isLoading: false,
};

export const appReducer: any = (
  state: DefaultStateI = defaultState,
  action: any
) => {
  const { payload } = action;

  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, ...payload };
    case DOMAIN_CHECK_MESSAGE:
      return { ...state, ...payload };
    case SET_LOADING:
      return { ...state, ...payload };
    case NEW_ORGANISATION_CREATE:
      return { ...state, ...payload };
    case SET_PLAN_TO_ORGANISATION:
      return { ...state, ...payload };
    default:
      return state;
  }
};
