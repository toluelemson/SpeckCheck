import React from "react";
import RecentProjects from "./recentProjects";
import TaskToday from "./taskToday";
import useCard from "@/src/context/cardContext/useCard";
import { MailEmailStats } from "@heathmont/moon-icons-tw";

const LeftProject = () => {
  const { card } = useCard();
  return (
    <>
      {card.length > 0 ? (
        <div className="flex flex-col w-full">
          <RecentProjects />
          <TaskToday />
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center mt-16 bg-white p-10">
          <MailEmailStats color="green" height={96} width={96} />

          <p className="text-green-600 font-bold text-xl">You have no card created yet</p>
        </div>
      )}
    </>
  );
};

export default LeftProject;
