import PagesHeader from "@/src/client/shared/header/PagesHeader";
import { useLink } from "@/src/hooks/useLink";
import React, { useState } from "react";
import Email from "../../svg/Email";
import Archive from "../../svg/Archive";
import Trash from "../../svg/Trash";
import SearchInput from "@/src/client/shared/search";
import Backarrow from "../../svg/Backarrow";
import Comment from "../../svg/Comment";
import { Button } from "@heathmont/moon-core-tw";
import Downarrow from "../../svg/Downarrow";
import Star from "../../svg/Star";
import Starfill from "../../svg/Starfill";

const SelectedInbox = () => {
  const { link, handleClick } = useLink("#22C55E");
  const [favorite, setFavorite] = useState(false);

  const items = [
    {
      icon: Email,
      title: "Inbox",
      color: "#22C55E",
    },
    {
      icon: Archive,
      title: "Archive",
      color: "#FEBA08",
    },
    {
      icon: Trash,
      title: "Delete",
      color: "red",
    },
  ];

  return (
    <>
      <PagesHeader />
      <div className="flex items-end justify-start h-12 bg-green-500 px-3">
        <div className="flex space-x-2">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item.color)}
              className={`flex items-center justify-center h-10 px-4 cursor-pointer transition-colors duration-500 space-x-1 rounded-t-md ${
                link === item.color
                  ? "bg-white text-gray-600"
                  : "bg-green-400 text-white"
              }`}
            >
              <item.icon color={link === item.color ? item.color : "white"} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex border">
        <div className="p-2 border-r w-3/12">
          <SearchInput placeholder="Search" />
        </div>
        <div className="flex items-center justify-end w-9/12 space-x-2 p-2">
          <Button className="flex items-center p-2 border">
            <Backarrow />
            <p className="text-gray-600 text-sm">Replay</p>
          </Button>
          <Button className="flex items-center p-2 border">
            <Comment />
            <p className="text-gray-600 text-sm">Comment</p>
          </Button>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-3/12 p-2 border">
          <div className="flex items-center space-x-3 py-2 px-5">
            <input type="checkbox" />
            <div className="flex items-center justify-center space-x-1">
              <p className="font-bold text-[12px]">1 of 1 Submission</p>
              <div className="flex items-center justify-center rounded-full bg-green-500 h-4 w-4">
                <Downarrow />
              </div>
            </div>
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-start justify-between p-3 border-l-8 border border-green-500 border-l-green-500">
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <div className="flex flex-col">
                  <p className="font-bold">Abu Godwin</p>
                  <p className="text-[12px]">abugodwinaj@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div onClick={() => setFavorite(!favorite)}>
                  {favorite ? <Starfill /> : <Star />}{" "}
                </div>
                <p className="text-[10px]">1d</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-9/12 p-10 space-y-8">
          <div>
            <p className="text-4xl font-bold">Abu Godwin</p>
            <p className="">abugodwinaj@gmail.com</p>
          </div>

          <div className="flex items-center space-y-4">
            <p className="w-4/12 text-gray-500">Submission Date</p>
            <p className="w-8/12">Mar 28, 2024 8:07 AM</p>
          </div>
          <div className="flex items-center space-y-4">
            <p className="w-4/12 text-gray-500">Describe Your Feedback:</p>
            <p className="w-8/12">
              I think u can do what ever u dream of if u believe and work hard
            </p>
          </div>
          <div className="flex items-center space-y-4">
            <p className="w-4/12 text-gray-500">Name</p>
            <p className="w-8/12">Abu Ushie</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedInbox;
