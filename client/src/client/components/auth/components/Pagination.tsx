import React, { useState } from 'react';

const Pagination = () => {
	const paginationValue = [0, 1, 2];
	const [click, setClick] = useState(0);

    const handleClick = (value: number) => { setClick(value); };
    
	return (
		<div className='flex items-center justify-center space-x-4 mt-12'>
			{paginationValue.map((value, index) => (
				<button
					key={index}
					onClick={() => handleClick(value)}
					className={`${
						click === value ? 'bg-gray-100' : 'bg-gray-500'
					} h-2 w-2 rounded-full`}></button>
			))}
		</div>
	);
};

export default Pagination;
