import React, { useState } from 'react';

const Checkbox = ({ text }: { text: string }) => {
	const [rememberMe, setRememberMe] = useState(true);

	const handleCheckboxChange = () => {
		setRememberMe(!rememberMe);
    };
    
	return (
		<div className='flex items-center justify-center space-x-2'>
			<input
				id='remember'
				type='checkbox'
				name='remember'
				checked={rememberMe}
				onChange={handleCheckboxChange}
			/>
			<label htmlFor='remember' className='text-sm'>{text}</label>
		</div>
	);
};

export default Checkbox;
