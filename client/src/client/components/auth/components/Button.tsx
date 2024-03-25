import { Button } from '@heathmont/moon-core-tw';
import Link from 'next/link';
import React from 'react';

const LoginButton = ({text, link}: {text: string; link: string}) => {
    return (
			<div className='mt-10'>
				<Link href={link}>
					<Button
						type='submit'
						className='flex w-full justify-center  rounded-xl bg-green-500 h-12 text-md font-semibold leading-6 text-white shadow-md'>
						{text}
					</Button>
				</Link>
			</div>
		);
};

export default LoginButton;
