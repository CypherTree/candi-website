import { Dispatch } from "redux";

import { AppDispatchTypes, SET_AUTHENTICATED } from "./appTypes";

export const SetAuthenticated = () => async (
  dispatch: Dispatch<AppDispatchTypes>
) => {
  console.log("*************** set auth action called");
  try {
    dispatch({
      type: SET_AUTHENTICATED,
      payload: {
        isAuthenticated: true,
      },
    });
  } catch (e) {
    console.log("an error occoured ", e);
  }
};
