import React from 'react';



const Group = ({width, height}:{width: string, height: string}) => {
	return (
		<svg
            width={width}
          color='white'
			height={height}
			viewBox='0 0 19 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M6.50008 8.16667C8.34103 8.16667 9.83342 6.67428 9.83342 4.83333C9.83342 2.99238 8.34103 1.5 6.50008 1.5C4.65913 1.5 3.16675 2.99238 3.16675 4.83333C3.16675 6.67428 4.65913 8.16667 6.50008 8.16667Z'
				stroke='white'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M1.5 16.5V14.8333C1.5 13.9493 1.85119 13.1014 2.47631 12.4763C3.10143 11.8512 3.94928 11.5 4.83333 11.5H8.16667C9.05072 11.5 9.89857 11.8512 10.5237 12.4763C11.1488 13.1014 11.5 13.9493 11.5 14.8333V16.5'
				stroke='white'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M12.3333 8.16667L13.9999 9.83333L17.3333 6.5'
				stroke='white'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default Group;
