import React from 'react';
import {
	MailEnvelope,
	SecurityLock,
	GenericUser,
} from '@heathmont/moon-icons-tw';
import SocialLogin from '../components/SocialHandle';
import OrContinueWith from '../components/OrContinueWith';
import LoginButton from '../components/Button';
import Input from '@/src/shared/Input';
import Checkbox from '@/src/shared/Checkbox';
import SideSection from '../components/SideSection';


const SignUp = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<SideSection />
			<div className='px-6 py-12 lg:w-1/2 w-full'>
				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<div className='flex flex-col'>
						<h1 className='font-bold mb-2 text-xl'>Sign Up for an Account</h1>
					</div>

					<form
						className='space-y-4 mt-7'
						action='#'
						method='POST'>
						<Input
							placeHolder='Username'
							icon={GenericUser}
							inputType='text'
						/>
						<Input
							placeHolder='Email'
							icon={MailEnvelope}
							inputType='email'
						/>
						<Input
							placeHolder='Password'
							icon={SecurityLock}
							inputType='password'
						/>
						<p className='text-md text-gray-400 -mt-2 text-xs'>
							Your password must have at least 8 characters
						</p>
						<div>
							<div className='flex items-center justify-between'>
								<Checkbox text='' />
								<p className='text-gray-400 text-xs'>
									By creating an account means you agree to the
									<span className='font-bold text-green-500'>
										{' '}
										Terms & Conditions
									</span>{' '}
									and our
									<span className='font-bold text-green-500'> Privacy Policy</span>
								</p>
							</div>
						</div>

						<LoginButton
							text='Sign Up'
							link='/'
						/>
					</form>

					<OrContinueWith text='Or sign up with' />
					<SocialLogin text='Already have an account?' link='/' linkText='Sign In' />
				</div>
			</div>
		</div>
	);
};

export default SignUp;
