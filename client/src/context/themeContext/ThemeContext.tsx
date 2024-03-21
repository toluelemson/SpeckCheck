import { createContext } from "react";
import { ThemeContextType } from "./constant";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
