export type Action = {
  type: "CHANGED_INPUT";
  payload: string;
};

const initialState = "";

export const searchBarInput = (
  state: string = initialState,
  action: Action
) => {
  switch (action.type) {
    case "CHANGED_INPUT": {
      const type = action.payload;

      return type;
    }
    default:
      return state;
  }
};
