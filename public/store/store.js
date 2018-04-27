import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import initialState from "./state.js";

import reducer from "../reducers/reducer.js";

const store = createStore(reducer, initialState,  applyMiddleware(thunk));

export default store;
