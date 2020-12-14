import { Types } from "./types";

interface DefaultStateI {}

const defaultState: DefaultStateI = [];

const { SET_AUTHENTICATED } = Types;

export const appReducer: any = (
  state: DefaultStateI = defaultState,
  action: any
) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
};
