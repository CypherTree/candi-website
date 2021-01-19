import { CONSTANTS } from "./types";

const intitalState: any = { message: "Hello World" };

export const reducer: any = (state: any = intitalState, action: any) => {
  const { LOGIN_USER, CLEAR_CURRENT_ORGANISATION } = CONSTANTS;

  console.log("---- old reducer was called ", state, action);

  switch (action.type) {
    case LOGIN_USER: {
      console.log("reducer called");
      return { message: "hello new world" };
    }

    default:
      return state;
  }
};
