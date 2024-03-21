import React, { useState } from "react";
import { Dropdown, MenuItem, Chip, Button } from "@heathmont/moon-core-tw";
import {
  ControlsChevronDown,
  ControlsChevronDownSmall,
} from "@heathmont/moon-icons-tw";
import Link from "next/link";

const people = ["Profile", "Logout"];

const DropdownItem = () => {
  const [option, setOption] = useState(null);
  return (
    <div className="flex flex-col lg:flex-row align-middle justify-around items-center gap-2">
      <Dropdown value={option} onChange={setOption}>
        <Dropdown.Trigger
          aria-label="Dropdown trigger"
          className="w-10 h-10 bg-gohan rounded-moon-i-md flex align-middle justify-center items-center cursor-pointer transition-colors hover:bg-piccolo/20 text-moon-24 text-trunks"
        >
          <ControlsChevronDown />
        </Dropdown.Trigger>
        <Dropdown.Options className="bg-white rounded-lg border w-24">
          {people.map((person, index) => (
            <Dropdown.Option value={person} key={index}>
              {({ selected, active }) => (
                <div className="hover:bg-gray-200 text-black p-1 rounded-lg">
                  <Link href="/">
                    <MenuItem isActive={active} isSelected={selected}>
                      {person}
                    </MenuItem>
                  </Link>
                </div>
              )}
            </Dropdown.Option>
          ))}
        </Dropdown.Options>
      </Dropdown>
    </div>
  );
};

export default DropdownItem;
