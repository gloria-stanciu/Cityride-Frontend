import { fromUnixTime } from "date-fns";
import "../css/SearchBar.css";
import { getStops } from "../api/getStops";
import { getPossibleRoutes } from "../api/possibleRoutes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StopsWithRoutes } from "../store/routesFromStop";
import { routeDetailsState } from "../store/routeDetails";
import { Station } from "../api/interfaces";

interface SearchedStops {
  id: string;
  lat: string;
  long: string;
  name: string;
}

function SearchBar() {
  // const [changedInput, setChangedInput] = useState("");
  // const [stopId, setStopId] = useState("");
  const [searchedStops, setSearchedStops] = useState<SearchedStops[]>([]);

  const dispatch = useDispatch();

  const isCollapsed = useSelector<any, Boolean>((state) => state.toggleSidebar);

  const setIsCollapsed = (type: boolean) => {
    dispatch({ type: "IS_COLLAPSED", payload: type });
  };

  const setRouteDetails = (type: routeDetailsState) => {
    dispatch({ type: "SHOW_ROUTE_DETAILS", payload: type });
  };

  const currentStopId = useSelector<any, string>(
    (state) => state.currentStopId
  );
  const setCurrentStopId = (type: string) => {
    dispatch({ type: "CURRENT_STOP_ID", payload: type });
  };

  const changedInput = useSelector<any, string>(
    (state) => state.searchBarInput
  );
  const setChangedInput = (type: string) => {
    dispatch({ type: "CHANGED_INPUT", payload: type });
  };

  const routesFromStop = useSelector<any, StopsWithRoutes[]>(
    (state) => state.routesFromStop
  );
  const setRoutesFromStop = (type: StopsWithRoutes[]) => {
    dispatch({ type: "SHOW_ROUTES_FROM_STOPS", payload: type });
  };

  const setTimetable = (type: Station[]) => {
    dispatch({ type: "SHOW_STOPS_OF_ROUTE", payload: type });
  };

  async function showSuggestions() {
    const possibleStops = await getStops(changedInput);
    setSearchedStops(possibleStops);
  }

  async function possibleRoutesFromStop() {
    const possibleRoutes = await getPossibleRoutes(currentStopId);
    console.log("pOSSIBLE ROUTES", possibleRoutes);
    setRoutesFromStop(possibleRoutes);
  }

  useEffect(() => {
    showSuggestions();
  }, [changedInput]);

  useEffect(() => {
    if (currentStopId !== "") {
      possibleRoutesFromStop();
    } else {
      console.log("current stop id e gol");
    }
  }, [currentStopId]);

  return (
    <div className="root">
      <div className="input-group">
        <input
          onChange={(e) => {
            setChangedInput(e.target.value);
            setRoutesFromStop([]);
            setRouteDetails({
              routeId: "",
              routeName: "",
              from: "",
              to: "",
              direction: { shapeId: "", stops: [] },
            });
            setCurrentStopId("");
          }}
          value={changedInput !== "" ? changedInput : ""}
          type="text"
          className="form-control input"
          placeholder="Search by a station"
        ></input>
      </div>
      {changedInput !== "" ? (
        <ul className="flex stops">
          {searchedStops.map((stop, index) => (
            <li
              key={index}
              onClick={() => {
                setChangedInput(stop.name);
                setCurrentStopId(stop.id);
                setRouteDetails({
                  routeId: "",
                  routeName: "",
                  from: "",
                  to: "",
                  direction: { shapeId: "", stops: [] },
                });
                setTimetable([]);
                if (isCollapsed === true) setIsCollapsed(!isCollapsed);
              }}
            >
              <a className="flex stopItem dropdown-item" href="#">
                {stop.name}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SearchBar;
