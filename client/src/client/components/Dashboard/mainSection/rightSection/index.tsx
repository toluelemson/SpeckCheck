import React, { useState } from "react";
import MessageSection from "./messageSection";
import CalendarComponent from "./Calender";
import Calendar from "./Calender";

const RightSection = () => {

  return (
    <div className="w-2/5">
      {/* <Calendar /> */}
      <MessageSection />
    </div>
  );
};

export default RightSection;
