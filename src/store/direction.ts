export enum Direction {
  outbound = "outbound",
  inbound = "inbound",
}

export type Action = { type: "SET_DIRECTION"; payload: Direction };

export interface DirectionState {
  direction: Direction;
}

export const setType = (type: Direction): Action => ({
  type: "SET_DIRECTION",
  payload: type,
});

const initialState = {
  direction: Direction.outbound,
};

export const changeDirection = (
  state: DirectionState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET_DIRECTION": {
      const direction = action.payload;

      return { direction: direction };
    }
    default:
      return state;
  }
};
