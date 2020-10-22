import { createStore, combineReducers } from "redux";
import { reducer as appReducer } from "./reducer";

const reducers = combineReducers({ app: appReducer });

export const store = createStore(reducers);
