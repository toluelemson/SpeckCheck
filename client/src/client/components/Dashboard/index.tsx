import React from 'react';
import SideSection from './SideSection';
import Header from './Header';
import MainSection from './MainSection';

const Dashboard = () => {
	return (
    <div className='flex bg-gray-200 w-full h-max'>
      <div className='w-1/5'>
      <SideSection />

      </div>
      <div className='relative flex flex-col w-4/5 bg-gray-100'>
        <Header />
        <MainSection />
      </div>
		</div>
	);
};

export default Dashboard;
