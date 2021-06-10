export type Action = { type: "SHOW_ROUTE_DETAILS"; payload: routeDetailsState };

export interface StationDetails {
  name: string;
  lat: string;
  long: string;
}
interface DirectionDetails {
  shapeId: string;
  stops: StationDetails[];
}
export interface routeDetailsState {
  // isVisible: boolean;
  routeId: string;
  routeName: string;
  from: string;
  to: string;
  direction: DirectionDetails;
  // direction: number;
}

// export const selectRoute = (type): Action => ({
//   type: "SHOW_ROUTE_DETAILS",
//   payload: type,
// });

const initialState = {
  routeId: "",
  routeName: "",
  from: "",
  to: "",
  direction: {
    shapeId: "",
    stops: [],
  },
};

export const routeDetails = (
  state: routeDetailsState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SHOW_ROUTE_DETAILS": {
      const type = action.payload;

      return type;
    }
    default:
      return state;
  }
};
