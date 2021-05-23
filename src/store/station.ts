export type Action = { type: "FLY_TO"; payload: object };

const initialState = { lat: "", long: "" };

export const currentStation = (
  state: object = initialState,
  action: Action
) => {
  switch (action.type) {
    case "FLY_TO": {
      const currentStation = action.payload;

      return currentStation;
    }
    default:
      return state;
  }
};
