import React from 'react';
import RecentProjects from './RecentProjects';
import TaskToday from './TaskToday';

const LeftProject = () => {
	return (
		<div className='flex flex-col w-full'>
			<RecentProjects />
			<TaskToday />
		</div>
	);
};

export default LeftProject;
