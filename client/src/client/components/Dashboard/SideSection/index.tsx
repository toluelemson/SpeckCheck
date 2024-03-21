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
import Toggle from "@/src/shared/Toggle/Toggle";
import { useLink } from "@/src/hooks/useLink";

const SideSection = () => {
  const { link, handleClick } = useLink("Dashboard");

  return (
    <div className="flex flex-col bg-white h-screen w-full border-r sticky top-0">
      <div className="pl-6 py-5">
        <Link href="#">
          <p className="text-2xl font-bold text-green-500">SpeckCheck</p>
        </Link>
      </div>

      <hr />

      <div className="relative pl-2 py-6">
        <p className="text-black font-bold ml-4">MENU</p>
        <div className="flex flex-col items-start justify-start space-y-3 mt-5 pr-6">
          {ROUTE_DATA.map((value, index) => (
            <Link
              href="#"
              onClick={() => handleClick(value.title)}
              className={`flex items-center justify-start py-2 w-full hover:bg-gray-200 hover:rounded-lg hover:transition hover:transform hover:duration-150 hover:translate-x-2 space-x-3 ${
                value.title === link
                  ? "text-green-500 bg-gray-200 rounded-lg font-bold"
                  : "text-black font-semibold"
              }`}
              key={index}
            >
              <div
                className={`ml-4 border rounded-md ${
                  value.title === link
                    ? "border-green-600"
                    : "border-black"
                }`}
              >
                <value.icon
                  height={22}
                  width={22}
                  color={
                    value.title === link
                      ? "text-blue-600 font-bold"
                      : "text-black font-semibold"
                  }
                />
              </div>
              <p>{value.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <hr />

      <div className="flex px-6 py-5 items-center justify-between w-full">
        <p className="text-md font-bold text-black">PROJECTS</p>

        <Link href="#">
          <ControlsPlus height={25} width={25} />
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-8 w-full">
        <div className="w-full flex flex-col space-y-4 bot">
          <div className="flex px-6">
            <Link href="#" className="flex items-center  space-x-3">
              <GenericSettings height={25} width={25} />
              <p className="text-black font-semibold">Settings</p>
            </Link>
          </div>

          <hr />

          <div className="flex items-center justify-between px-6 w-[270px]">
            <Link href="#" className="flex items-center  space-x-3 w-full">
              <OtherMoon height={25} width={25} />
              <p className="text-black font-semibold">Dark Mode</p>
            </Link>
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSection;
