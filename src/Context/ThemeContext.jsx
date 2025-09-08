import { createContext, useReducer } from "react";
import { ThemeReducer } from "./reducts/theme.reducts";
import { TOGGLE_THEME } from "./ActionTypes";

const initialState = {
  theme: "light",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const toggleTheme = (val) => {
    dispatch({
      type: TOGGLE_THEME,
      payload: val === "light" ? "dark" : "light",
    });
  };

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
