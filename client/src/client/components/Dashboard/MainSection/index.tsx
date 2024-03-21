import React from 'react';
import LeftProject from './LeftSection';
import RightSection from './RightSection';

const MainSection = () => {
	return (
		<div className='flex p-3 items-start space-x-3 justify-between'>
			<LeftProject />
			<RightSection />
		</div>
	);
};

export default MainSection;
