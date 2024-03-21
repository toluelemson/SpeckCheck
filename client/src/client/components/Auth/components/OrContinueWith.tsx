import React from 'react';

const OrContinueWith = ({ text }: { text: string }) => {
	return (
		<div className='flex items-center justify-between mt-8'>
			<hr className='border w-2/6' />
			<p className='text-gray-400 w-2/6 text-center text-xs'>{text}</p>
			<hr className='border w-2/6' />
		</div>
	);
};

export default OrContinueWith;
