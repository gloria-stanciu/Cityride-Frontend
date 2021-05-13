import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToggleState, TransportType } from "../store/filters";
import { GetAllStops } from "../api/filtersAPI";
import FilterButtons from "./FilterButtons";
import DirectionFilter from "./DirectionFilter";
import store from "../store";

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

function DisplayRoutes() {
  const [routes, setRoutes] = useState<Routes[]>([]);
  const [routeDetails, setRouteDetails] = useState({});
  const dispatch = useDispatch();
  const setType = (type: TransportType) => {
    store.dispatch({ type: "SET_TYPE", payload: type });
  };

  const direction = useSelector<any, ToggleState["transportType"]>(
    (state) => state.changeDirection.routeDirection
  );

  const selectedType = useSelector<any, ToggleState["transportType"]>(
    (state) => state.toggleReducer.transportType
  );

  const [isCollapsed, setIsCollapsed] = useState(false);

  function ToggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  async function ShowRoutes() {
    if (selectedType !== -1) {
      setRoutes([]);
      const getRoutes = await GetAllStops(selectedType);
      console.log(getRoutes);
      setRoutes(getRoutes);
    }
  }

  useEffect(() => {
    selectedType !== -1 && ShowRoutes();
  }, [selectedType]);

  return (
    <div className="display-routes">
      {routes ? (
        routes.map((route, index) => (
          <div
            key={index}
            className="route-container btn"
            onClick={() => {
              setRouteDetails(route);
              console.log(routeDetails);
            }}
          >
            <div className="route-box col-6">
              <span className="route-card">{route.shortName}</span>
            </div>
            <div className="col-10">
              <span className="ruta">
                De la &nbsp;
                <strong>
                  {" "}
                  {direction != undefined ? route[direction].stops[0].name : ""}
                </strong>
              </span>
              <span className="ruta ">
                La &nbsp;
                <strong>
                  {" "}
                  {direction != undefined
                    ? route[direction].stops.reverse()[0].name
                    : ""}
                </strong>
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>Routes are loading</p>
      )}
    </div>
  );
}

export default DisplayRoutes;
function Context(Context: any): { dispatch: any } {
  throw new Error("Function not implemented.");
}
