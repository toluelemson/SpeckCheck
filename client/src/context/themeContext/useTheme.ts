import { useContext } from "react";
import { ThemeContextType } from "./constant";
import { ThemeContext } from "./ThemeContext";


const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a BetProvider");
  }
  return context;
};

export default useTheme;
