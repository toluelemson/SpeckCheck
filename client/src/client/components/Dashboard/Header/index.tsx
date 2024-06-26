import React from 'react';
import Image from 'next/image';
import {
	GenericSearch,
	NotificationsBell,
	ControlsChevronDownSmall,
} from '@heathmont/moon-icons-tw';
import Avatar from '../assets/Avatar.png';
import Link from 'next/link';
import DropdownItem from '@/src/shared/Dropdown/Dropdown';
import useTheme from '@/src/context/themeContext/useTheme';


const Header = () => {
	const {colorTheme} = useTheme();
	return (
    <div
      className={`flex items-center justify-between sticky top-0 z-50 p-6 h-[73px] ${colorTheme.bgColor} ${colorTheme.border}`}
    >
      <Link href="#">
        <h1 className={`text-black text-2xl font-bold ${colorTheme.textColor}`}>
          Dashboard
        </h1>
      </Link>
      <div className="flex items-center space-x-5">
        <div
          className={`flex items-center border px-2 ${colorTheme.bgColor} rounded-lg h-8`}
        >
          <GenericSearch height={25} width={25} className={colorTheme.textColor}/>
          <input
            type="text"
            className={`w-44 borderless-input rounded-lg pl-2 ${colorTheme.bgColor} ${colorTheme.textColor}`}
            placeholder="Search Feedback..."
          />
        </div>

        <Link href="#">
          <NotificationsBell height={25} width={25} color="gray" />
        </Link>

        <Link href="#">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <Image src={Avatar} alt="avater alt" height={40} width={40} />
              <div className="flex flex-col">
                <p className={`font-bold text-md ${colorTheme.textColor}`}>
                  Angela L.
                </p>
                <p className="text-gray-500 text-xs ">{`Review's`}</p>
              </div>
            </div>

            <DropdownItem />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
