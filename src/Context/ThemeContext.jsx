import { createContext, useEffect, useReducer } from "react";
import { ThemeReducer } from "./reducts/theme.reducts";
import { TOGGLE_THEME } from "./ActionTypes";

const initialState = {
  theme: "light",
};

const getTheme = () => {
  const theme = localStorage.getItem("theme");

  if (theme) {
    return { theme };
  } else {
    return { theme: "light" };
  }
};
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialState, getTheme);

  const toggleTheme = (val) => {
    dispatch({
      type: TOGGLE_THEME,
      payload: val === "light" ? "dark" : "light",
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
