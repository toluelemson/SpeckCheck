import React from "react";
import Link from "next/link";
import useTheme from "@/src/context/themeContext/useTheme";
import {
  AccordionDropdown,
  RadioAccordionDropdown,
} from "@/src/shared/accordion";
import { SORT_DATA, TYPES } from "../constant/data";
import SearchInput from "@/src/shared/search";

const SideBarSection = () => {
  const { colorTheme } = useTheme();
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
        <SearchInput placeholder="Search Template..." />
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
