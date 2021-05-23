import { combineReducers, createStore } from "redux";
import { toggleReducer } from "./filters";
import { changeDirection } from "./direction";
import { routeDetails } from "./routeDetails";
import { toggleSidebar } from "./sidebar";
import { currentStation } from "./station";
// rootReducer = combineReducers({ toggleReducer, changeDirection });

const store = createStore(
  combineReducers({
    toggleReducer,
    changeDirection,
    routeDetails,
    toggleSidebar,
    currentStation,
  })
);

store.subscribe(() => {
  console.log("Store updated", store.getState());
});

export default store;
