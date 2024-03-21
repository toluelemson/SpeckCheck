import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Checkbox from "@/src/shared/Checkbox";
import {
  Other3DotsHorizontal,
  GenericEdit,
  GenericDelete,
} from "@heathmont/moon-icons-tw";
import Link from "next/link";
import { GenericShareIos } from "@heathmont/moon-icons-tw";
import Fb from "@/src/client/components/Svg/Fb";
import Twitter from "@/src/client/components/Svg/Twitter-x";
import Whatsapp from "@/src/client/components/Svg/Whatsapp";
import Clipboard from "@/src/client/components/Svg/Clipboard";
import { useVisibilityControl } from "@/src/hooks/useDeviceVisibility";
import Modal from "@/src/shared/Modal/Modal";
import { Textarea } from "@heathmont/moon-core-tw";
import { DeleteContent } from "../components/DeleteContent";
import { EditContent } from "../components/EditContent";

type Props = {
  text: string;
  title: string;
  pic: StaticImageData;
};

const Card = ({ text, title, pic }: Props) => {
  const [isClick, setIsClick] = useState(false);
  const { isOpen, setIsOpen, handleClick } = useVisibilityControl();
  const {
    isOpen: isEditOpen,
    setIsOpen: setIsEditOpen,
    handleClick: handleEditClick,
  } = useVisibilityControl();

  return (
    <>
      {isClick ? (
        <div
          onClick={() => setIsClick(!isClick)}
          className="flex items-center justify-between px-4 py-3 text-xs bg-white rounded-xl font-bold"
        >
          <div className="flex space-x-1">
            <Checkbox text="" />
            <p>{text}</p>
          </div>

          <div className="flex space-x-8">
            <div className="flex items-center bg-yellow-100 px-2 rounded-xl">
              <p className="text-yellow-400 font-semibold">{title}</p>
            </div>
            <div className="relative">
              <Image
                src={pic}
                alt="pic alt"
                height={25}
                width={25}
                className="border-white border-2 rounded-full"
              />

              <Image
                src={pic}
                alt="pic alt"
                height={25}
                width={25}
                className="absolute left-4 top-0 border-white border-2 rounded-full"
              />
            </div>

            <Other3DotsHorizontal width={30} height={25} />
          </div>
        </div>
      ) : (
        <div className="pt-3 pb-5 bg-white space-y-2">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2 rounded-full">
              <p className="text-green-700 text-sm underline">
                http://localhost:5173/s/es4DS
              </p>
              <GenericShareIos height={20} width={20} color="black" />
              <Clipboard />
            </div>
            <div className="flex space-x-2">
              <GenericEdit
                height={22}
                width={22}
                color="blue"
                onClick={handleEditClick}
              />
              <GenericDelete
                height={22}
                width={22}
                color="red"
                onClick={handleClick}
              />
            </div>
          </div>
          <hr />
          <div className="p-4">
            <p className="text-sm text-black font-bold">Request Card</p>
            <p className="text-gray-700 text-[12px] mt-2">
              {`"Hi, I'm on a mission to upgrade my "personal software". 🖥️ Could you share one thing you admire about me and one area for an update? Your insights are like gold! Thanks, " - From, Abu.`}
            </p>
          </div>
          <hr />
          <div className="flex items-center space-x-2 px-4">
            <p className="font-bold text-sm">Share this link:</p>
            <div className="flex space-x-4">
              <Fb />
              <Twitter />
              <Whatsapp />
            </div>
          </div>

          <Modal
            openModal={isOpen}
            setOpenModal={setIsOpen}
            modalContent={
              <DeleteContent
                isClick={isClick}
                setIsClick={setIsClick}
                setIsOpen={setIsOpen}
              />
            }
          />

          <Modal
            openModal={isEditOpen}
            setOpenModal={setIsEditOpen}
            modalContent={
              <EditContent
                isClick={isClick}
                setIsClick={setIsClick}
                setIsOpen={setIsEditOpen}
              />
            }
          />
        </div>
      )}
    </>
  );
};

export default Card;
