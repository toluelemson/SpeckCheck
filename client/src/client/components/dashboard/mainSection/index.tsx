import React from "react";
// import LeftProject from "./LeftSection";
import RightSection from "./rightSection";

const MainSection = ({LeftSection}: {LeftSection: React.JSX.Element}) => {
  return (
    <div className="flex p-3 items-start space-x-3 justify-between">
      {/* <LeftProject /> */}
	  {LeftSection}
      <RightSection />
    </div>
  );
};

export default MainSection;
