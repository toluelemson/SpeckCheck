import React from "react";
import SideSection from "./sideSection";
import Header from "../../shared/header";
import MainSection from "./mainSection";
import Layout from "./Layout";
import LeftProject from "./mainSection/leftSection";
import { MailEmailStats } from "@heathmont/moon-icons-tw";
import useCard from "@/src/context/cardContext/useCard";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center w-full">
        <LeftProject />
      </div>
    </Layout>
  );
};

export default Dashboard;
