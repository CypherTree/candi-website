import { Types } from "./types";

interface DefaultStateI {
  currentOrganization: {};
  isLoading: boolean;
}

const defaultState: DefaultStateI = {
  isLoading: false,
  currentOrganization: {},
};

const {
  SET_LOADING,
  SET_AUTHENTICATED,
  DOMAIN_CHECK_MESSAGE,
  NEW_ORGANISATION_CREATE,
  SET_PLAN_TO_ORGANISATION,
  ADD_COMPANY_DETAILS_TO_ORGANISATION,
  SET_CURRENT_ORGANISATION,
  ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION,
  CLEAR_CURRENT_ORGANISATION,
} = Types;

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
    case SET_CURRENT_ORGANISATION:
      return { ...state, ...payload };
    case SET_PLAN_TO_ORGANISATION:
      return { ...state, ...payload };
    case ADD_COMPANY_DETAILS_TO_ORGANISATION:
      return { ...state, ...payload };
    case ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION: {
      return { ...state, ...payload };
    }
    case CLEAR_CURRENT_ORGANISATION: {
      const newState = state;
      state.currentOrganization = {};
      return newState;
    }
    default:
      return state;
  }
};
