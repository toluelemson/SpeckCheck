import React from 'react';
import RecentProjects from './recentProjects';
import TaskToday from './taskToday';
import { Button } from '@heathmont/moon-core-tw';

const LeftProject = () => {
	return (
    <div className="flex flex-col w-full">
      <RecentProjects />


      <TaskToday />
    </div>
  );
};

export default LeftProject;
