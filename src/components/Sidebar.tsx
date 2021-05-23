import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToggleState, TransportType } from "../store/filters";
import { GetAllStops } from "../api/filtersAPI";
import FilterButtons from "./FilterButtons";
import DirectionFilter from "./DirectionFilter";
import store from "../store";
import DisplayRoutes from "./DisplayRoutes";
import RouteStations from "./RouteStations";
import { routeDetailsState } from "../store/routeDetails";
import { LeftArrow } from "./LeftArrow";

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
    <div className="sidebar-overlay">
      <aside className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="sidebar-content">
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
