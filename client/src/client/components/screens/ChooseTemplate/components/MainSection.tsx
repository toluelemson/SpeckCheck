import React, { useState } from 'react'
import { ArrowsLeftCurved, ControlsEye, FilesText } from "@heathmont/moon-icons-tw";
import { Button } from '@heathmont/moon-core-tw';
import Link from 'next/link';


const MainSection = () => {
    const [isHover, setIsHover] = useState(false);
    const handleClick = () => {
        setIsHover(!isHover)
    }

  return (
    <div>
      <div className="flex flex-col justify-center h-max">
        <p className="font-bold text-center text-xl">Choose a Card</p>
        <p className="text-gray-500 text-center">
          Explore 10,000+ ready-made templates to create a form in minutes
          orcreate form from scratch
        </p>
      </div>

      <div className="flex items-center justify-start space-x-4 mt-5">
        <div className="bg-gray-200 rounded-md p-1 w-max">
          <ArrowsLeftCurved color="gray" height={30} width={30} />
        </div>
        <div>
          <p>{`Form Template / Order Card`}</p>
        </div>
      </div>

      <p className="text-2xl font-bold mt-3">Order Cards</p>

      <div className="flex items-center justify-start space-x-1">
        <FilesText height={20} width={20} />
        <p className="text-[12px]">{`231 cards`}</p>
      </div>

      <div className="mt-12 w-80 space-y-2 cursor-pointer">
        <Link href="/chooseTemplate/personal-card">
          <div
            onMouseEnter={handleClick}
            onMouseLeave={handleClick}
            className="flex items-center justify-center h-80 rounded-lg border bg-gray-500 hover:opacity-70"
          >
            {isHover ? (
              <div className="flex translate-y-3 transition-all duration-300 items-center justify-center border-2 border-white text-xl px-3 text-white rounded-full font-bold">
                <ControlsEye color="white" height={30} width={30} />
                <p>View</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <p className="text-black font-bold text-xl">Personal Form Data</p>

        <Link href="/chooseTemplate/personal-card">
          <Button className="border-2 border-green-500 mt-3 font-bold text-green-500 w-full">
            Use Card
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MainSection