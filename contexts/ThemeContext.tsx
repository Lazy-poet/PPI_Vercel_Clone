import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export enum THEME {
  LIGHT,
  DARK,
}

const useTheme = () => {
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme(THEME.DARK);
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      setTheme(THEME.LIGHT);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, []);

  const changeTheme = (theme: THEME) => {
    setTheme(theme);

    if (theme == THEME.LIGHT) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else if (theme == THEME.DARK) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  };

  return { theme, changeTheme };
};

export const ThemeContext = createContext({
  theme: THEME.LIGHT,
  changeTheme: (theme: THEME) => {},
});

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const { theme, changeTheme } = useTheme();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeValue = () => useContext(ThemeContext);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
