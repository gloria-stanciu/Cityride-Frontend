import { Station } from "../api/interfaces";

export type Action = {
  type: "SHOW_STOPS_OF_SEARCHED_ROUTE";
  payload: Station[];
};

const initialState = [];

export const searchedRouteTimetable = (
  state: Station[] = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SHOW_STOPS_OF_SEARCHED_ROUTE": {
      const type = action.payload;

      return type;
    }
    default:
      return state;
  }
};
