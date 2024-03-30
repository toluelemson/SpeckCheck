import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Checkbox from "@/src/shared/Checkbox";
import {
  GenericShareIos,
  GenericCheckRounded,
  Other3DotsHorizontal,
  GenericEdit,
  GenericDelete,
  FilesCopy,
} from "@heathmont/moon-icons-tw";
import Link from "next/link";
import Fb from "@/src/client/components/svg/Fb";
import Twitter from "@/src/client/components/svg/Twitter-x";
import Whatsapp from "@/src/client/components/svg/Whatsapp";
import Clipboard from "@/src/client/components/svg/Clipboard";
import { useVisibilityControl } from "@/src/hooks/useVisibilityControl";
import Modal from "@/src/shared/modal/Modal";
import { Textarea } from "@heathmont/moon-core-tw";
import { DeleteContent } from "../components/DeleteContent";
import { EditContent } from "../components/EditContent";
import useTheme from "@/src/context/themeContext/useTheme";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

type Props = {
  id: string;
  title: string;
  inbox: string;
  pic: StaticImageData;
};

const Card = ({ id, inbox, title, pic }: Props) => {
  const [link, setLink] = useState("http://localhost:5173/s/es4DS");
  const [isCopy, setIsCopy] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const { isOpen, setIsOpen, handleClick } = useVisibilityControl();
  const {
    isOpen: isEditOpen,
    setIsOpen: setIsEditOpen,
    handleClick: handleEditClick,
  } = useVisibilityControl();
  const { theme, colorTheme } = useTheme();

  const handleCopyCode = () => {
    if (link.length > 1) {
      setIsCopy(true);
      setLink("http://localhost:5173/s/es4DS");
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log("Ticket code copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy ticket code: ", error);
        });
    }
  };

  const handleLinkClick = () => {
    window.open("http://localhost:5173/s/es4DS", "_blank");
  };

  useEffect(() => {
    if (isCopy) {
      const timer = setTimeout(() => {
        setIsCopy(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopy]);

  return (
    <>
      {!isClick ? (
        <div
          className={`flex items-center justify-between px-4 py-3 text-xs ${colorTheme.bgColor} rounded-xl font-bold shadow-lg`}
        >
          <div className="flex space-x-1">
            <Checkbox text="" />
            <p
              onClick={() => setIsClick(!isClick)}
              className={`${colorTheme.textColor} underline cursor-pointer`}
            >
              {title}
            </p>
          </div>

          <div className="flex space-x-8">
            {/* <Link href={`/inbox/${id}`}> */}
            <Link
              href={`/inbox/${id}`}
              className="flex items-center bg-yellow-100 px-2 rounded-xl"
            >
              <p className="text-yellow-500 font-semibold">{`Inbox: ${inbox}`}</p>
            </Link>
            {/* </Link> */}

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

            <Other3DotsHorizontal
              width={30}
              height={25}
              className={colorTheme.textColor}
              onClick={() => setIsClick(!isClick)}
            />
          </div>
        </div>
      ) : (
        <div
          className={`pt-3 pb-5 ${colorTheme.bgColor} space-y-2 rounded-xl shadow-lg`}
        >
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2 rounded-full">
              <p onClick={handleLinkClick} className="text-green-500 underline">
                http://localhost:5173/s/es4DS
              </p>

              {!isCopy ? (
                <div
                  className="flex items-center"
                  onClick={() => {
                    handleCopyCode();
                    setIsCopy(!isCopy);
                  }}
                >
                  <FilesCopy
                    height={30}
                    width={30}
                    className={colorTheme.textColor}
                  />
                  <p className={`${colorTheme.textColor} text-sm`}>Copy Link</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <GenericCheckRounded
                    height={30}
                    width={30}
                    className={colorTheme.textColor}
                  />
                  <p className={`${colorTheme.textColor} text-sm`}>Copied!</p>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <GenericEdit
                height={30}
                width={30}
                color={!theme ? "white" : "blue"}
                onClick={handleEditClick}
              />
              <GenericDelete
                height={30}
                width={30}
                color="red"
                onClick={handleClick}
              />
              <Other3DotsHorizontal
                width={30}
                height={25}
                className={colorTheme.textColor}
                onClick={() => setIsClick(!isClick)}
              />
            </div>
          </div>
          <hr className={colorTheme.border} />
          <div className="p-4">
            <p className={`${colorTheme.textColor} font-bold`}>Request Card</p>
            <p className={`${colorTheme.textGray} text-sm mt-2`}>
              {`"Hi, I'm on a mission to upgrade my "personal software". 🖥️ Could you share one thing you admire about me and one area for an update? Your insights are like gold! Thanks, " - From, Abu.`}
            </p>
          </div>
          <hr className={colorTheme.border} />

          <div className="flex items-center space-x-2 px-4">
            <p className={`font-bold ${colorTheme.textColor}`}>
              Share this link:
            </p>
            <div className="flex space-x-4">
              <FacebookShareButton url="http://localhost:5173/s/es4DS">
                <Fb />
              </FacebookShareButton>
              <TwitterShareButton
                url="http://localhost:5173/s/es4DS"
                title={title}
              >
                <Twitter color={!theme ? "white" : "black"} />
              </TwitterShareButton>
              <WhatsappShareButton
                url="http://localhost:5173/s/es4DS"
                title={title}
              >
                <Whatsapp />
              </WhatsappShareButton>
            </div>
          </div>

          <Modal
            openModal={isOpen}
            setOpenModal={setIsOpen}
            modalContent={
              <DeleteContent
                id={id}
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
