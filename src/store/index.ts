import { combineReducers, createStore } from "redux";
import { toggleReducer } from "./filters";
import { changeDirection } from "./direction";
import { routeDetails } from "./routeDetails";
import { toggleSidebar } from "./sidebar";
import { currentStation } from "./station";
import { routesFromStop } from "./routesFromStop";
import { searchBarInput } from "./searchBarInput";
import { currentStopId } from "./currentStop";
import { routeTimetable } from "./routeTimetable";
import { searchedRouteTimetable } from "./searchedRouteTimetable";
// rootReducer = combineReducers({ toggleReducer, changeDirection });

const store = createStore(
  combineReducers({
    toggleReducer,
    changeDirection,
    routeDetails,
    toggleSidebar,
    currentStation,
    routesFromStop,
    searchBarInput,
    currentStopId,
    routeTimetable,
    searchedRouteTimetable,
  })
);

store.subscribe(() => {
  console.log("Store updated", store.getState());
});

export default store;
