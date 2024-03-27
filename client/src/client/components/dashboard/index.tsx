import React from "react";
import SideSection from "./sideSection";
import Header from "../../../shared/header";
import MainSection from "./mainSection";
import Layout from "./Layout";
import LeftProject from "./mainSection/leftSection";

const Dashboard = () => {
  return (
    // <div className='flex bg-gray-200 w-full h-max'>
    //   <div className='w-1/5'>
    //   <SideSection />

    //   </div>
    //   <div className='relative flex flex-col w-4/5 bg-gray-100'>
    //     <Header />
    //     <MainSection LeftSection={}/>
    //   </div>
    // </div>
    <Layout>
      <LeftProject />
    </Layout>
  );
};

export default Dashboard;
