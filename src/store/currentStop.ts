export type Action = {
  type: "CURRENT_STOP_ID";
  payload: string;
};

const initialState = "";

export const currentStopId = (state: string = initialState, action: Action) => {
  switch (action.type) {
    case "CURRENT_STOP_ID": {
      const type = action.payload;

      return type;
    }
    default:
      return state;
  }
};
