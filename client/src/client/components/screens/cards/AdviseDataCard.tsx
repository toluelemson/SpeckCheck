import React from "react";
import { InputCard } from "../components/Input";
import ButtonItem from "../components/Button";
import { Textarea } from "@heathmont/moon-core-tw";

const AdviseDataCard = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center px-12 pt-12 pb-5">
        <p className="flex items-center font-bold text-xl">Advise Data Card</p>
        <p className="text-gray-500 font-semibold">
          Fill in your advise request
        </p>
      </div>

      <hr />

      <div className="p-12 space-y-16">
        <div className="space-y-2">
          <label className="font-bold teext-gray-500">Title</label>
          <InputCard type="text" label="Enter title for the advise" />
        </div>

        <div className="space-y-2">
          <label className="font-bold teext-gray-500">Seek Advise Message</label>
          <Textarea className="h-64 w-full border"></Textarea>
        </div>

        <ButtonItem handleClick={handleClick} />
      </div>
    </div>
  );
};

export default AdviseDataCard;
