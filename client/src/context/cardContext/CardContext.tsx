import { createContext } from "react";
import { CardContextType } from "./constant";

export const CardContext = createContext<CardContextType | undefined>(undefined);
