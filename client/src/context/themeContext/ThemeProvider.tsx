import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const getThemeStatusFromLocalStorage = JSON.parse(
      localStorage.getItem("theme") || "true"
    );
    setTheme(getThemeStatusFromLocalStorage);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const colorTheme = theme
    ? {
        bgColor: "bg-white",
        textColor: "text-gray-900",
        border: "",
        textGray: "text-gray-700",
      }
    : {
        bgColor: "bg-gray-900",
        textColor: "text-white",
        border: "border-gray-700",
        textGray: "text-gray-200"
      };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
