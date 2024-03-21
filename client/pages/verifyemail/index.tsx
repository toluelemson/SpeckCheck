import VerifyEmail from '@/src/client/components/Auth/VerifyEmail/VerifyEmail';
import type { NextPage } from 'next';

const EmailVerification: NextPage = (props) => (
	<div>
		<VerifyEmail {...props} />
	</div>
);

export default EmailVerification;
