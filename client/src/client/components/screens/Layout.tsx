import React from "react";
import Header from "@/src/client/shared/header";

const Layout = ({
  sideBarSection,
  mainSection,
}: {
  mainSection: React.JSX.Element;
  sideBarSection: React.JSX.Element;
}) => {
  return (
    <div className="flex bg-gray-200 w-full h-max">
      <div className="w-1/5">{sideBarSection}</div>
      <div className="relative flex flex-col w-4/5 bg-gray-100">
        <Header />
        <div className="p-4">{mainSection}</div>
      </div>
    </div>
  );
};

export default Layout;
