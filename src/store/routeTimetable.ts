import { Station } from "../api/interfaces";

export type Action = {
  type: "SHOW_STOPS_OF_ROUTE";
  payload: Station[];
};

const initialState = [];

export const routeTimetable = (
  state: Station[] = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SHOW_STOPS_OF_ROUTE": {
      const type = action.payload;

      return type;
    }
    default:
      return state;
  }
};
