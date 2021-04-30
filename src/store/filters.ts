export enum TransportType {
  Tram = 0,
  Subway = 1,
  Train = 2,
  Bus = 3,
  None = -1,
}

export type Action = { type: "SET_TYPE"; payload: TransportType };

export interface ToggleState {
  transportType: TransportType;
}

export const setType = (type: TransportType): Action => ({
  type: "SET_TYPE",
  payload: type,
});

const initialState = {
  transportType: TransportType.None,
};

export const toggleReducer = (
  state: ToggleState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_TYPE": {
      const type =
        state.transportType === action.payload
          ? TransportType.None
          : action.payload;

      return { ...state, transportType: type };
    }
    default:
      return state;
  }
};
