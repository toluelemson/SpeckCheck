import React from "react";
import useTheme from "@/src/context/themeContext/useTheme";
import { GenericSearch } from "@heathmont/moon-icons-tw";

const SearchInput = ({ placeholder }: { placeholder: string }) => {
  const { colorTheme } = useTheme();
  return (
    <div className={`flex items-center border px-2 w-full ${colorTheme.bgColor} h-10`}>
      <GenericSearch height={25} width={25} className={colorTheme.textColor} />
      <input
        type="text"
        className={`w-full borderless-input rounded-lg pl-2 ${colorTheme.bgColor} ${colorTheme.textColor}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
