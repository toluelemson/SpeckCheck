import React from "react";
import Link from "next/link";
import { Other3DotsHorizontal } from "@heathmont/moon-icons-tw";
import Card from "./Card";
import useTheme from "@/src/context/themeContext/useTheme";
import useCard from "@/src/context/cardContext/useCard";

const RecentProjects = () => {
  const { colorTheme } = useTheme();
  const { card } = useCard();
  return (
    <div className={`${colorTheme.bgColor} p-4 rounded-lg space-y-5 shadow-lg`}>
      <div className="flex items-center justify-between">
        <p className={`font-bold ${colorTheme.textColor}`}>Most Review Feedbacks</p>
        <Other3DotsHorizontal
          width={35}
          height={25}
          className={colorTheme.textColor}
        />
      </div>

      <hr className={colorTheme.border} />

      <div className="flex flex-row items-center justify-between space-x-2">
        {card.slice(0,3).map((value, index) => (
          <Link href="#" key={index}>
            <div>
              <Card {...value} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
