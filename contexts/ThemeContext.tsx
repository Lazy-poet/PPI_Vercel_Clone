import { useContext, createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(
  {} as { theme: THEME; changeTheme: (t: THEME) => void }
);

export enum THEME {
  LIGHT,
  DARK,
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<THEME>(THEME.LIGHT);

  useEffect(() => {
    const userPreference = localStorage.getItem("color-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (userPreference === "dark" || (prefersDark && !userPreference)) {
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

    if (theme === THEME.LIGHT) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else if (theme === THEME.DARK) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
