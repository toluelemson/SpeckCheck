import { useState } from "react";
import { ControlsChevronUp } from "@heathmont/moon-icons-tw";
import Checkbox from "../Checkbox";

type DropdownProps = {
  title: string;
  count: string;
};

type AccordionDropdownProps = {
  cardsTitle: string;
  formTypes: DropdownProps[];
};

export const AccordionDropdown = ({
  cardsTitle,
  formTypes,
}: AccordionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsRotated(!isRotated);
  };

  return (
    <>
      <div
        className="flex items-center justify-between p-3 border-b cursor-pointer"
        onClick={handleClick}
      >
        <p className="font-bold">{cardsTitle}</p>
        <ControlsChevronUp
          height={25}
          width={25}
          className={isRotated ? "rotate text-green-500" : ""}
        />


      </div>

      {Array.isArray(formTypes) && formTypes.map((value, index) => (
        <div
          key={index}
          className={`card-section ${isOpen ? "open" : "closed"}`}
        >
          <div className="flex items-center justify-between hover:bg-gray-200 text-gray-500 py-3 px-3">
            <p className="font-semibold text-sm">{value.title}</p>
            <span className="bg-gray-200 font-bold px-2 rounded-md">
              <p className="text-[10px]">{value.count}</p>
            </span>
          </div>

        </div>
      ))}
    </>
  );
};

export const RadioAccordionDropdown = ({formTitle, formTypes}: {formTitle: string, formTypes: string[]}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsRotated(!isRotated);
  };
  return (
    <>
      <div
        className="flex items-center justify-between p-3 border-b cursor-pointer"
        onClick={handleClick}
      >
        <p className="font-bold">{formTitle}</p>
        <ControlsChevronUp
          height={25}
          width={25}
          className={isRotated ? "rotate text-green-500" : ""}
        />
      </div>

      {Array.isArray(formTypes) &&
        formTypes.map((value, index) => (
          <div key={index} className={`card-section ${isOpen ? "open" : "closed"} w-full`}>
            <div className="flex items-center justify-start hover:bg-gray-200 text-gray-500 py-3 px-3">
              <Checkbox text={value} />
            </div>
          </div>
        ))}
    </>
  );
};
