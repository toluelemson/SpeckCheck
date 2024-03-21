import React from 'react'

const Tick = ({ width, height }: { width: string; height: string }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 16 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M10.8895 2.33347H5.11016C3.09616 2.33347 1.8335 3.75947 1.8335 5.77747V11.2228C1.8335 13.2408 3.09016 14.6668 5.11016 14.6668H10.8888C12.9095 14.6668 14.1668 13.2408 14.1668 11.2228V5.77747C14.1668 3.75947 12.9095 2.33347 10.8895 2.33347Z'
				stroke='#64748B'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M5.62646 8.50012L7.20913 10.0821L10.3731 6.91812'
				stroke='#64748B'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default Tick
