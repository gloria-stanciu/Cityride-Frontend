import "../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToggleState, TransportType } from "../store/filters";
import { GetAllStops } from "../api/filtersAPI";
import { Direction } from "../store/direction";
import { routeDetailsState } from "../store/routeDetails";

export interface DisplayComponent {
  name: string;
  type: TransportType;
  status: string;
  component: string;
  class: string;
}

interface RouteDirection {
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
  outbound: RouteDirection;
  inbound: RouteDirection;
  type: number;
}

function DisplayRoutes() {
  const [routes, setRoutes] = useState<Routes[]>([]);
  // const [routeDetails, setRouteDetails] = useState({});
  const dispatch = useDispatch();

  const routeDetails = useSelector<any, routeDetailsState>(
    (state) => state.routeDetails.isVisible
  );

  const setRouteDetails = (type: routeDetailsState) => {
    dispatch({ type: "SHOW_ROUTE_DETAILS", payload: type });
  };

  const direction = useSelector<any, Direction>(
    (state) => state.changeDirection.routeDirection
  );

  const selectedType = useSelector<any, ToggleState["transportType"]>(
    (state) => state.toggleReducer.transportType
  );

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
    <div>
      <div className="display-routes">
        {routes ? (
          routes.map((route, index) => (
            <div
              key={index}
              className="route-container btn"
              onClick={() => {
                setRouteDetails({
                  isVisible: true,
                  routeId: route.id,
                  direction: direction === "outbound" ? 0 : 1,
                });
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
                    {direction != undefined
                      ? route[direction].stops[0].name
                      : ""}
                  </strong>
                </span>
                <span className="ruta">
                  La &nbsp;
                  <strong>
                    {direction != undefined
                      ? route[direction].stops.reverse()[0].name
                      : ""}
                  </strong>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayRoutes;
