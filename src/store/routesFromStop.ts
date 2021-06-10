export type Action = {
  type: "SHOW_ROUTES_FROM_STOPS";
  payload: StopsWithRoutes[];
};

interface DirectionRoute {
  shapeId: string;
  arrivalTime: string;
  departureTime: string;
  shortName: string;
}

export interface StopsWithRoutes {
  routeId: string;
  stopId: string;
  stopLat: string;
  stopLong: string;
  stopName: string;
  startDate: string;
  endDate: string;
  tripId: string;
  inbound: DirectionRoute[];
  outbound: DirectionRoute[];
}

const initialState = [];

export const routesFromStop = (
  state: StopsWithRoutes[] = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SHOW_ROUTES_FROM_STOPS": {
      const type = action.payload;

      return type;
    }
    default:
      return state;
  }
};
