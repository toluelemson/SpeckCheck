import { useContext } from "react";
import { CardContextType } from "./constant";
import { CardContext } from "./CardContext";

const useCard = (): CardContextType => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};

export default useCard;
