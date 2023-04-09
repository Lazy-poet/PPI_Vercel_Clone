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

  useEffect(() => {
    // const userPreference = localStorage.getItem("color-theme");
    if (window.matchMedia) {
      const listener = (e: MediaQueryListEvent) => {
        changeTheme(e.matches ? THEME.DARK : THEME.LIGHT);
      };
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (
        matchMedia &&
        matchMedia.addEventListener &&
        matchMedia.removeEventListener
      ) {
        changeTheme(matchMedia.matches ? THEME.DARK : THEME.LIGHT);
        matchMedia.addEventListener("change", listener);

        return () => matchMedia.removeEventListener("change", listener);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
