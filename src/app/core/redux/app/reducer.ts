import { SET_AUTHENTICATED, DOMAIN_CHECK_MESSAGE } from "./types";

interface DefaultStateI {}

const defaultState: DefaultStateI = [];

export const appReducer: any = (
  state: DefaultStateI = defaultState,
  action: any
) => {
  const { payload } = action;

  console.log("payload rec", payload);

  switch (action.type) {
    case SET_AUTHENTICATED:
      return action.payload;
    case DOMAIN_CHECK_MESSAGE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
