import "../css/Sidebar.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToggleState, TransportType } from "../store/filters";
import { GetAllStops } from "../api/filtersAPI";
import { Direction } from "../store/direction";

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
  const [routeDetails, setRouteDetails] = useState({});

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
      {selectedType != -1 && direction ? (
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
                      {direction != undefined
                        ? route[direction].stops[0].name
                        : ""}
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
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default DisplayRoutes;
