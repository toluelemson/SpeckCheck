import React from 'react';
import MessageCard from './MessageCard';
import { MESSAGE_DATA } from '../../Constant/data';
import Link from 'next/link';

const MessageSection = () => {
	return (
		<div className='p-4 bg-white w-full mt-6 rounded-lg space-y-5'>
			<p className='text-black font-bold'>Messages</p>
			<hr />
			{MESSAGE_DATA.map((value, index) => (
				<div key={index}>
					<Link href='#'>
						<MessageCard {...value} />
					</Link>
					<hr className='mt-5' />
				</div>
			))}

			<div className='py-3'>
				<Link
					href='#'
					className='font-bold text-center'>
					<p>See All</p>
				</Link>
			</div>
		</div>
	);
};

export default MessageSection;
