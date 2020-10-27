import { SET_AUTHENTICATED } from "./appTypes";

interface DefaultStateI {}

const defaultState: DefaultStateI = [];

export const appReducer: any = (
  state: DefaultStateI = defaultState,
  action: any
) => {
  //   const { LOGIN_USER } = CONSTANTS;
  console.log("inside app reducers");
  switch (action.type) {
    case SET_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
};
