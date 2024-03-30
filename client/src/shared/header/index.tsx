import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GenericSearch, NotificationsBell } from "@heathmont/moon-icons-tw";
import Avatar from "../../assest/Avatar.png";
import DropdownItem from "@/src/shared/dropdown/Dropdown";
import useTheme from "@/src/context/themeContext/useTheme";
import { UrlPathname } from "@/src/utils/UrlPathname";

const Header = () => {
  const { colorTheme } = useTheme();
  const router = useRouter();
  const { asPath } = router;

  const capitalizedPath = UrlPathname();

  return (
    <div
      className={`flex items-center justify-between sticky top-0 z-50 p-6 h-[73px] ${colorTheme.bgColor} ${colorTheme.border}`}
    >
      {asPath === "/dashboard" || asPath === "/inbox" ? (
        <Link href="#">
          <h1
            className={`text-black text-2xl font-bold ${colorTheme.textColor}`}
          >
            {capitalizedPath}
          </h1>
        </Link>
      ) : (
        <div></div>
      )}

      <div className="flex items-center space-x-5">
        <div
          className={`flex items-center border px-2 ${colorTheme.bgColor} rounded-lg h-8`}
        >
          <GenericSearch
            height={25}
            width={25}
            className={colorTheme.textColor}
          />
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
