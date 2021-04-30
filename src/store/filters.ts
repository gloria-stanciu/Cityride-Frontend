export type Action = { type: "TOGGLE"; payload: boolean };

export interface ToggleState {
  isClicked: boolean;
}

export const toggle = (isClicked: boolean): Action => ({
  type: "TOGGLE",
  payload: isClicked,
});

const initialState = {
  isClicked: false,
};

export const toggleReducer = (
  state: ToggleState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "TOGGLE": {
      return { ...state, isClicked: !state.isClicked };
    }
    default:
      return state;
  }
};
