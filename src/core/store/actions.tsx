//in useActions.ts file
import { CONSTANTS } from "./types";

import axios from "axios";

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  const { LOGIN_USER } = CONSTANTS;

  dispatch({ type: LOGIN_USER });
};
