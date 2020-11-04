import { CONSTANTS } from "./types";

const intitalState: any = { message: "Hello World" };

export const reducer: any = (state: any = intitalState, action: any) => {
  const { LOGIN_USER } = CONSTANTS;

  switch (action.type) {
    case LOGIN_USER: {
      console.log("reducer called");
      return { message: "hello new world" };
    }
    default:
      return state;
  }
};
