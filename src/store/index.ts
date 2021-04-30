import { createStore } from "redux";
import { toggleReducer } from "./filters";

const store = createStore(toggleReducer);

export default store;
