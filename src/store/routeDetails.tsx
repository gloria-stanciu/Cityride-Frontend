export type Action = { type: "SHOW_ROUTE_DETAILS"; payload: routeDetailsState };

export interface routeDetailsState {
  isVisible: boolean;
  routeId: string;
  direction: number;
}

export const setType = (type): Action => ({
  type: "SHOW_ROUTE_DETAILS",
  payload: type,
});

const initialState = {
  isVisible: false,
  routeId: "",
  direction: 0, // for outbound
};

export const routeDetails = (
  state: routeDetailsState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SHOW_ROUTE_DETAILS": {
      const type = action.payload;

      return { ...state, routeDetailsState: type };
    }
    default:
      return state;
  }
};
