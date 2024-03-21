import React from "react";
import MessageCard from "./MessageCard";
import { MESSAGE_DATA } from "../../Constant/data";
import Link from "next/link";
import useTheme from "@/src/context/themeContext/useTheme";

const MessageSection = () => {
  const { theme, colorTheme } = useTheme();
  return (
    <div className={`p-4 ${colorTheme.bgColor} w-full mt-0 rounded-lg space-y-5`}>
      <p className={`${colorTheme.textColor} font-bold`}>Messages</p>
      <hr className={colorTheme.border} />
      {MESSAGE_DATA.map((value, index) => (
        <div key={index}>
          <Link href="#">
            <MessageCard {...value} />
          </Link>
          <hr className={`mt-5 ${colorTheme.border}`} />
        </div>
      ))}

      <div className="py-3">
        <Link href="#" className="font-bold text-center">
          <p className={colorTheme.textColor}>See All</p>
        </Link>
      </div>
    </div>
  );
};

export default MessageSection;
