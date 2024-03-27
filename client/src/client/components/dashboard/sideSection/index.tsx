import React, { useState } from "react";
import Image from "next/image";
import Logo from "./../assets/logo.png";
import { ROUTE_DATA } from "../constant/data";
import Link from "next/link";
import {
  ControlsPlus,
  GenericSettings,
  OtherMoon,
} from "@heathmont/moon-icons-tw";
import Toggle from "@/src/shared/toggle/Toggle";
import { useLink } from "@/src/hooks/useLink";
import useTheme from "@/src/context/themeContext/useTheme";
import { Button } from "@heathmont/moon-core-tw";

const SideSection = () => {
  const { link, handleClick } = useLink("Dashboard");
  const { theme, colorTheme } = useTheme();


  return (
    <div
      className={`flex flex-col h-screen w-full border-r sticky top-0 ${colorTheme.bgColor}`}
    >
      <div className="pl-6 py-5">
        <Link href="#">
          <p className="text-2xl font-bold text-green-500">SpeckCheck</p>
        </Link>
      </div>

      <hr className={colorTheme.border} />

      <div className="relative pl-2 py-6">
        <p className={`font-bold ml-4 ${colorTheme.textColor}`}>MENU</p>
        <div className="flex flex-col items-start justify-start space-y-3 mt-5 pr-6">
          {ROUTE_DATA.map((value, index) => (
            <Link
              href="#"
              onClick={() => handleClick(value.title)}
              className={`flex items-center justify-start py-2 w-full hover:rounded-lg hover:transition hover:transform hover:duration-150 hover:translate-x-2 space-x-3 ${
                value.title === link
                  ? "text-green-500 bg-gray-200 rounded-lg font-bold shadow-lg"
                  : `${colorTheme.textColor} font-semibold`
              }`}
              key={index}
            >
              <div
                className={`ml-4 border rounded-md ${
                  value.title === link ? "border-green-600" : "border-black"
                }`}
              >
                <value.icon
                  height={22}
                  width={22}
                  color={
                    value.title === link
                      ? "text-blue-600 font-bold"
                      : `${colorTheme.textColor} font-semibold`
                  }
                />
              </div>
              <p>{value.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="pr-6 pl-2 pb-3">
        <Link href="/chooseTemplate">
          <Button className="text-white font-bold bg-green-600 rounded-lg shadow-3xl py-2 px-5 w-full mt-3">
            Create Feedback Card
          </Button>
        </Link>
      </div>

      <hr className={colorTheme.border} />

      <div className="flex px-6 py-5 items-center justify-between w-full">
        <p className={`text-md font-bold ${colorTheme.textColor}`}>FEEDBACK</p>
        <Link href="#">
          <ControlsPlus
            height={25}
            width={25}
            className={colorTheme.textColor}
          />
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-8 w-full">
        <div className="w-full flex flex-col space-y-4 bot">
          <div className="flex px-6">
            <Link href="#" className="flex items-center  space-x-3">
              <GenericSettings
                height={25}
                width={25}
                className={colorTheme.textColor}
              />
              <p className={`${colorTheme.textColor} font-semibold`}>
                Settings
              </p>
            </Link>
          </div>

          <hr className={colorTheme.border} />

          <div className="flex items-center justify-between px-6 w-[270px]">
            <Link href="#" className="flex items-center  space-x-3 w-full">
              <OtherMoon
                height={25}
                width={25}
                className={colorTheme.textColor}
              />
              <p className={`${colorTheme.textColor} font-semibold`}>
                Dark Mode
              </p>
            </Link>
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSection;
