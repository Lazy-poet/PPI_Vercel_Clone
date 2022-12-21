import { useEffect, useState } from "react";

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

export default useTheme;
