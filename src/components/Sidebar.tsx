import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToggleState, TransportType } from "../store/filters";
import { GetAllStops } from "../api/filtersAPI";
import FilterButtons from "./FilterButtons";
import DirectionFilter from "./DirectionFilter";
import DisplayRoutes from "./DisplayRoutes";
import RouteStations from "./RouteStations";
import { routeDetailsState, StationDetails } from "../store/routeDetails";
import { LeftArrow } from "./LeftArrow";
import { StopsWithRoutes } from "../store/routesFromStop";
// import { DirectionRoute } from "../store/routesFromStop";
import { formatDistanceToNowStrict } from "date-fns";
import { getPossibleRoutes } from "../api/possibleRoutes";
import { Station } from "../api/interfaces";
import { getTimetable } from "../api/routeTimetable";
import { ro } from "date-fns/locale";

export interface DisplayComponent {
  name: string;
  type: TransportType;
  status: string;
  component: string;
  class: string;
}

interface Direction {
  shapeId: string;
  stops: {
    id: string;
    name: string;
    sequence: number;
    routeId: string;
    lat: string;
    long: string;
  }[];
}

export interface Routes {
  id: string;
  longName: string;
  shortName: string;
  outbound: Direction;
  inbound: Direction;
  type: number;
}

const buttons = [
  {
    name: "Tram",
    type: 0, //from GTFS
    active: "/images/Tram/tram-active.svg",
    inactive: "/images/Tram/tram-active.svg",
  },
  {
    name: "Bus",
    type: 3, //from GTFS
    active: "/images/Bus/bus-active.svg",
    inactive: "/images/Bus/bus-active.svg",
  },
  {
    name: "Train",
    type: 2, //from GTFS
    active: "/images/Train/train-active.svg",
    inactive: "/images/Train/train-active.svg",
  },
  {
    name: "Subway",
    type: 1, //from GTFS
    active: "/images/Subway/subway-active.svg",
    inactive: "/images/Subway/subway-active.svg",
  },
];

function Sidebar() {
  const [routes, setRoutes] = useState<Routes[]>([]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [stopInfo, setStopInfo] = useState<StationDetails[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const selectedType = useSelector<any, ToggleState["transportType"]>(
    (state) => state.toggleReducer.transportType
  );

  const selectedRoute = useSelector<any, routeDetailsState>(
    (state) => state.routeDetails
  );

  const isCollapsed = useSelector<any, Boolean>((state) => state.toggleSidebar);
  const dispatch = useDispatch();

  const setIsCollapsed = (type: boolean) => {
    dispatch({ type: "IS_COLLAPSED", payload: type });
  };

  // const timetable = useSelector<any, Station[]>(
  //   (state) => state.routeTimetable
  // );
  // const setTimetable = (type: Station[]) => {
  //   dispatch({ type: "SHOW_STOPS_OF_ROUTE", payload: type });
  // };

  const searchedRouteTimetable = useSelector<any, Station[]>(
    (state) => state.searchedRouteTimetable
  );
  const setSearchedRouteTimetable = (type: Station[]) => {
    dispatch({ type: "SHOW_STOPS_OF_SEARCHED_ROUTE", payload: type });
  };

  const routeDetails = useSelector<any, routeDetailsState>(
    (state) => state.routeDetails
  );

  const setRouteDetails = (type: routeDetailsState) => {
    dispatch({ type: "SHOW_ROUTE_DETAILS", payload: type });
  };

  const currentStopId = useSelector<any, string>(
    (state) => state.currentStopId
  );

  const routesFromStop = useSelector<any, StopsWithRoutes[]>(
    (state) => state.routesFromStop
  );

  const setChangedInput = (type: string) => {
    dispatch({ type: "CHANGED_INPUT", payload: type });
  };

  const setRoutesFromStop = (type: StopsWithRoutes[]) => {
    dispatch({ type: "SHOW_ROUTES_FROM_STOPS", payload: type });
  };

  const direction = useSelector<any, string>(
    (state) => state.changeDirection.direction
  );

  function ToggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  async function ShowRoutes() {
    if (selectedType !== -1) {
      setRoutes([]);
      const getRoutes = await GetAllStops(selectedType);
      setRoutes(getRoutes);
    }
  }

  async function fetchTimetable() {
    const routeDirection = direction === "outbound" ? 0 : 1;
    if (routeDetails.routeId !== "") {
      const response = await getTimetable(routeDetails.routeId, routeDirection);
      setSearchedRouteTimetable(response);
    }
  }

  function parseArrivalTime(arrivalTime: string) {
    const splittedArrivalTime = arrivalTime.split(":");
    const date = new Date();
    date.setHours(
      parseInt(splittedArrivalTime[0]),
      parseInt(splittedArrivalTime[1]),
      parseInt(splittedArrivalTime[2])
    );
    return date;
  }

  async function possibleRoutesFromStop() {
    const possibleRoutes = await getPossibleRoutes(currentStopId);
    setRoutesFromStop(possibleRoutes);
  }

  useEffect(() => {
    fetchTimetable();
  }, [isClicked]);

  useEffect(() => {
    selectedType !== -1 && ShowRoutes();
  }, [selectedType]);

  useEffect(() => {
    if (routeDetails.routeId !== "") {
      if (
        searchedRouteTimetable !== undefined &&
        searchedRouteTimetable.length !== 0
      ) {
        const res = searchedRouteTimetable.reduce<StationDetails[]>(
          (result, route) => {
            result.push({
              name: route.name,
              lat: route.lat,
              long: route.long,
            });
            return result;
          },
          []
        );
        if (routeDetails.direction.stops.length === 0) {
          setRouteDetails({
            ...routeDetails,
            from: res[0].name,
            to: res[res.length - 1].name,
            direction: {
              shapeId: routeDetails.direction.shapeId,
              stops: res,
            },
          });
        }
      }
    }
  }, [searchedRouteTimetable]);

  useEffect(() => {
    routesFromStop.length !== 0 && possibleRoutesFromStop() && fetchTimetable();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="sidebar-overlay">
      <aside className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="sidebar-content">
          {routesFromStop.length === 0 ? (
            <>
              {selectedRoute.routeId !== "" ? (
                <RouteStations />
              ) : (
                <>
                  <div className="sidebar-header">
                    <FilterButtons />
                    <DirectionFilter />
                  </div>
                  <DisplayRoutes />
                </>
              )}
            </>
          ) : (
            <>
              {(currentStopId !== "" && selectedRoute.routeId !== "") ||
              selectedRoute.routeId !== "" ? (
                <RouteStations />
              ) : (
                <>
                  <div className="searched-routes">
                    <button
                      className="btn back-button"
                      onClick={() => {
                        setRoutesFromStop([]);
                        setRouteDetails({
                          routeId: "",
                          routeName: "",
                          from: "",
                          to: "",
                          direction: {
                            shapeId: "",
                            stops: [],
                          },
                        });
                        setChangedInput("");
                        setIsClicked(false);
                      }}
                    >
                      <LeftArrow />
                    </button>
                    <div className="current-time my-3 p-0">
                      Current time: &nbsp;
                      <strong>
                        {currentTime.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </strong>
                    </div>
                  </div>
                  {routesFromStop.map((route, index) => (
                    <div key={index}>
                      {route.outbound.length !== 0 ? (
                        <div
                          key={index}
                          className="btn route-container d-flex justify-content-between flex-row"
                          onClick={() => {
                            if (routeDetails.routeId === "") {
                              setRouteDetails({
                                routeId: route.routeId,
                                routeName: route.outbound[0].shortName,
                                from: "",
                                to: "",
                                direction: {
                                  shapeId: route.outbound[0].shapeId,
                                  stops: [],
                                },
                              });
                            }
                            setIsClicked(true);
                          }}
                        >
                          <span className="d-flex route-card route-box">
                            {route.outbound[0].shortName}
                          </span>
                          <span className="d-flex align-self-center">
                            Outbound
                          </span>
                          <span className="d-flex align-self-center m-2 time">
                            Arrives in <br />
                            {formatDistanceToNowStrict(
                              parseArrivalTime(route.outbound[0].arrivalTime)
                            )}
                          </span>
                        </div>
                      ) : null}
                      {route.inbound.length !== 0 ? (
                        <div
                          key={index + 100}
                          className="btn route-container d-flex justify-content-between flex-row"
                          onClick={() => {
                            setRouteDetails({
                              routeId: route.routeId,
                              routeName: route.inbound[0].shortName,
                              from: "",
                              to: "",
                              direction: {
                                shapeId: route.inbound[0].shapeId,
                                stops: [],
                              },
                            });
                            setIsClicked(true);
                          }}
                        >
                          <span className="d-flex route-card route-box">
                            {route.inbound[0].shortName}
                          </span>
                          <span className="d-flex align-self-center">
                            Inbound
                          </span>
                          <span className="d-flex align-self-center m-2 time">
                            Arrives in <br />
                            {formatDistanceToNowStrict(
                              parseArrivalTime(route.inbound[0].arrivalTime)
                            )}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div className="sidebar-toggle-wrapper">
          <button className="sidebar-toggle" onClick={ToggleSidebar}>
            <LeftArrow />
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
