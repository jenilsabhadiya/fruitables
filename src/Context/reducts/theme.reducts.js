import { TOGGLE_THEME } from "../ActionTypes";

export const ThemeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        theme: action.payload,
      };

    default:
      return state;
  }
};
