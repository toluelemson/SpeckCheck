import React, { useState } from "react";
import Image from "next/image";
import Logo from "./../assets/logo.png";
// import { ROUTE_DATA } from "../constant/data";
import Link from "next/link";
import {
  ControlsPlus,
  GenericSearch,
  GenericSettings,
  OtherMoon,
} from "@heathmont/moon-icons-tw";
import Toggle from "@/src/shared/toggle/Toggle";
import { useLink } from "@/src/hooks/useLink";
import useTheme from "@/src/context/themeContext/useTheme";
import { Button } from "@heathmont/moon-core-tw";
import DropdownItem from "@/src/shared/dropdown/Dropdown";
import {
  AccordionDropdown,
  RadioAccordionDropdown,
} from "@/src/shared/accordion";
import { SORT_DATA, TYPES } from "../constant/data";

const SideBarSection = () => {
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
      <div className="px-3 mt-6">
        <div
          className={`flex items-center border px-2 ${colorTheme.bgColor} h-10`}
        >
          <GenericSearch
            height={25}
            width={25}
            className={colorTheme.textColor}
          />
          <input
            type="text"
            className={`w-44 borderless-input rounded-lg pl-2 ${colorTheme.bgColor} ${colorTheme.textColor}`}
            placeholder="Search Template..."
          />
        </div>
      </div>

      <div className="mt-16 scroll-y">
        {SORT_DATA.map((value, index) => (
          <RadioAccordionDropdown
            key={index}
            formTitle={value.formTitle}
            formTypes={value.formTypes}
          />
        ))}

        {TYPES.map((value, index) => (
          <AccordionDropdown
            key={index}
            cardsTitle={value.formTitle}
            formTypes={value.formTypes}
          />
        ))}
      </div>

    
    </div>
  );
};

export default SideBarSection;
