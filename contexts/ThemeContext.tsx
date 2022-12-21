import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useTheme, { THEME } from "@/hooks/useTheme";

export const ThemeContext = createContext({
  theme: THEME.LIGHT,
  changeTheme: (theme: THEME) => {},
});

export const ThemeProvider = ({ children }: { children: any }) => {
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
