import { combineReducers, createStore } from "redux";
import { toggleReducer } from "./filters";
import { changeDirection } from "./direction";
import { routeDetails } from "./routeDetails";
import { toggleSidebar } from "./sidebar";
// rootReducer = combineReducers({ toggleReducer, changeDirection });

const store = createStore(
  combineReducers({
    toggleReducer,
    changeDirection,
    routeDetails,
    toggleSidebar,
  })
);

store.subscribe(() => {
  console.log("Store updated", store.getState());
});

export default store;
