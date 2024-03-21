import React from 'react';
import LeftProject from './LeftSection';
import RightSection from './RightSection';

const MainSection = () => {
	return (
		<div className='flex p-6 items-start space-x-6 justify-between'>
			<LeftProject />
			<RightSection />
		</div>
	);
};

export default MainSection;
