import React from "react";
import Layout from "../Layout";
import SideBarSection from "./components/SideBarSection";
import MainSection from "./components/MainSection";

const ChooseTemplate = () => {
  return (
    <Layout
      sideBarSection={<SideBarSection/>}
      mainSection={<MainSection/>}
    />
  );
};

export default ChooseTemplate;
