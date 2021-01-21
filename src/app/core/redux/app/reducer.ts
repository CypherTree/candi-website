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

    case ADD_COMPANY_DETAILS_TO_ORGANISATION: {
      const { currentOrganization } = state;
      Object.assign(payload, currentOrganization);
      return { ...state, ...currentOrganization };
    }
    case ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION: {
      const { currentOrganization } = state;
      console.log("<----- current org ----->", currentOrganization);

      console.log("<----- payload ----->", payload);

      let newOrg;

      if (payload.currentOrganization) {
        newOrg = Object.assign(
          payload.currentOrganization,
          currentOrganization
        );
        console.log("---has all");
      } else {
        newOrg = Object.assign(payload, currentOrganization);
        console.log("--- had all");
      }

      console.log("final currentOrg", currentOrganization);

      console.log(" ----- new org currentOrg", newOrg);

      const newState = state;
      newState.currentOrganization = newOrg;

      return newState;
    }

    case CLEAR_CURRENT_ORGANISATION: {
      const currentOrganization = {};
      return { ...state, ...currentOrganization };
    }

    default:
      return state;
  }
};
