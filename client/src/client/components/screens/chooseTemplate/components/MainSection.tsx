import React, { useState } from "react";
import Link from "next/link";
import { ControlsEye } from "@heathmont/moon-icons-tw";
import { Button } from "@heathmont/moon-core-tw";
import { PROJECTS_DATA } from "../../../dashboard/mainSection/constant/data";
import Image from "next/image";
import { useLink } from "@/src/hooks/useLink";

const MainSection = () => {
  const { link, handleClick } = useLink("");

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {PROJECTS_DATA.map((card, index) => (
          <div key={index} className="mt-12 w-80 space-y-2 cursor-pointer ">
            <Link href={`/chooseTemplate/${card.id}`}>
              <div
                onMouseEnter={() => handleClick(card.id)}
                onMouseLeave={() => handleClick('')}
                className="relative flex items-center justify-center h-80 rounded-lg border bg-gray-600 duration-300 hover:duration-300 hover:shadow-xl hover:transition-all hover:-translate-y-2"
              >
                {link === card.id && (
                  <div className="absolute flex items-center justify-center z-20 border-2 border-black text-xl px-3 text-black rounded-full font-bold">
                    <ControlsEye color="black" height={30} width={30} />
                    <p className="text-black">View</p>
                  </div>
                )}

                <Image src={card.bgImg} alt="card alt" className="absolute" />
              </div>
            </Link>
            <p className="text-black font-bold text-xl">{card.title}</p>

            <Link href="/chooseTemplate/personal-card">
              <Button className="border-2 border-green-500 mt-3 font-bold text-green-500 w-full">
                Use Card
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
