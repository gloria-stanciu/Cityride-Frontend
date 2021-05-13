import { combineReducers, createStore } from "redux";
import { toggleReducer } from "./filters";
import { changeDirection } from "./direction";

// rootReducer = combineReducers({ toggleReducer, changeDirection });

const store = createStore(combineReducers({ toggleReducer, changeDirection }));

store.subscribe(() => {
  console.log("Store updated", store.getState());
});

export default store;
