export type Action = { type: "IS_COLLAPSED"; payload: boolean };

const initialState = false;

export const toggleSidebar = (
  state: boolean = initialState,
  action: Action
) => {
  switch (action.type) {
    case "IS_COLLAPSED": {
      const toggleSidebar = action.payload;

      return toggleSidebar;
    }
    default:
      return state;
  }
};
