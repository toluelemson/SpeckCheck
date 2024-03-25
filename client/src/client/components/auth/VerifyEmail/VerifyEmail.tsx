import React from 'react'
import LoginButton from '../components/Button';
import SideSection from '../components/SideSection';
import Link from 'next/link';

const VerifyEmail = () => {
  return (
		<div className='flex items-center justify-center w-full h-full'>
			<SideSection />
			<div className='px-6 py-12 lg:w-1/2 w-full'>
				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<div className='flex flex-col'>
						<h1 className='font-bold mb-2 text-xl'>Verify your email</h1>
						<p className='text-gray-400 text-sx'>
							Thank you, check your email for instructions to reset your
							password
						</p>
					</div>

					<LoginButton
						text='Skip Now'
						link='/'
					/>

					<p className='mt-5 text-start text-sm text-gray-500'>
						{`Don't receive an email?`}
						<Link
							href='/verifyemail'
							className='font-bold leading-6 text-green-500 pl-1'>
							Resend
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default VerifyEmail