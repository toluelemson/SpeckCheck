import Dashboard from '@/src/client/components/Dashboard';
import type { NextPage } from 'next';

const Dashboards: NextPage = (props) => (
	<div>
		<Dashboard {...props} />
	</div>
);

export default Dashboards;
