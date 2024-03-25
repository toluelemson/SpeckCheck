import React from 'react'

const TableCircle = ({ width, height }: { width: string; height: string }) => {
	return (
		<svg
			width={width}
			color='white'
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g clip-path='url(#clip0_54_700)'>
				<path
					d='M12.1747 11.1852C13.9747 11.5713 15.7468 10.425 16.1329 8.625C16.5189 6.82499 15.3727 5.05283 13.5727 4.66677C11.7727 4.28071 10.0005 5.42695 9.61446 7.22696C9.2284 9.02698 10.3746 10.7991 12.1747 11.1852Z'
					stroke='white'
					stroke-width='1.5'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M5.94565 18.3721C7.74566 18.7581 9.51782 17.6119 9.90388 15.8119C10.2899 14.0119 9.1437 12.2397 7.34369 11.8536C5.54367 11.4676 3.77151 12.6138 3.38545 14.4138C2.99939 16.2139 4.14563 17.986 5.94565 18.3721Z'
					stroke='white'
					stroke-width='1.5'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M14.9085 20.2944C16.7086 20.6804 18.4807 19.5342 18.8668 17.7342C19.2528 15.9342 18.1066 14.162 16.3066 13.776C14.5066 13.3899 12.7344 14.5361 12.3483 16.3362C11.9623 18.1362 13.1085 19.9083 14.9085 20.2944Z'
					stroke='white'
					stroke-width='1.5'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_54_700'>
					<rect
						width='20'
						height='20'
						fill='white'
						transform='translate(4.31934 0.125294) rotate(12.1051)'
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default TableCircle
