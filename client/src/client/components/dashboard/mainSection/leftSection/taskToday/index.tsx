import Link from "next/link";
import React from "react";
import Card from "./Card";
import useCard from "@/src/context/cardContext/useCard";
import { ControlsChevronRight } from "@heathmont/moon-icons-tw";

const TaskToday = () => {
  const { card } = useCard();
  return (
    <div>
      <div className="flex items-center justify-between my-6">
        <p className="font-bold ">
          {`Today's Feedback`} <span className="font-thin">(10)</span>
        </p>

        <Link href="#">
          <div className="flex items-center">
            <p>See All </p>
            <ControlsChevronRight color="blue" height={20} width={20} />
          </div>
        </Link>
      </div>

      <div className="flex flex-col space-y-5">
        {card.map((value: any, index: number) => (
          <div key={index}>
            <Card {...value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskToday;
