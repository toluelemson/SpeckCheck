import React, { ReactNode } from "react";
import SideSection from "./sideSection";
import MainSection from "./mainSection";
import Header from "../../shared/header";

const Layout = ({ children }: { children: React.JSX.Element }) => {
  return (
    <div className="flex bg-gray-200 w-full h-max">
      <div className="w-1/5">
        <SideSection />
      </div>
      <div className="relative flex flex-col w-4/5 bg-gray-100">
        <Header />
        <MainSection LeftSection={children} />
      </div>
    </div>
  );
};

export default Layout;
