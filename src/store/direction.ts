export enum Direction {
  default = "outbound",
  outbound = "outbound",
  inbound = "inbound",
}

export type Action = { type: "SET_DIRECTION"; payload: Direction };

export interface ToggleState {
  routeDirection: Direction;
}

export const setType = (type: Direction): Action => ({
  type: "SET_DIRECTION",
  payload: type,
});

const initialState = {
  routeDirection: Direction.default,
};

export const changeDirection = (
  state: ToggleState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_DIRECTION": {
      const type = action.payload;

      return { ...state, routeDirection: type };
    }
    default:
      return state;
  }
};
