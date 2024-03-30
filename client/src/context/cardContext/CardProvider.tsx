import React, { useEffect, useRef, useState } from "react";
import { CardContext } from "./CardContext";
import { SharedCardProps } from "./constant";

type CardProviderProps = {
  children: React.ReactNode;
};

export const CardProvider: React.FC<CardProviderProps> = ({
  children,
}: CardProviderProps) => {
  const initialRender = useRef(true);
  const [card, setCard] = useState<SharedCardProps[]>([]);

  useEffect(() => {
    const cardFromLocalStorage = JSON.parse(
      localStorage.getItem("card") || "[]"
    );
    setCard(cardFromLocalStorage);
  }, []);

  const handleSharedCard = (selectedSharedCard: SharedCardProps) => {
    setCard((prevCard) => {
      const isCardAvailable = prevCard.some(
        (item) => item?.id === selectedSharedCard?.id
      );
      if (!isCardAvailable) {
        return [...prevCard, selectedSharedCard];
      }
      return prevCard;
    });
  };

  const handleDelete = (id: string) => {
    if (id) {
      const updateBetList = card.filter((card) => !(card.id === id));
      setCard([...updateBetList]);
    }
  };

  const handleDeleteAll = () => {
    setCard([]);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    window.localStorage.setItem("card", JSON.stringify(card));
  }, [card]);

  return (
    <CardContext.Provider value={{ card, handleDelete, handleDeleteAll, handleSharedCard }}>
      {children}
    </CardContext.Provider>
  );
};
