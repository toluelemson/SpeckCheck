import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Tick from '@/src/client/components/Svg/Tick';
import { Progress } from '@heathmont/moon-core-tw';
import { Other3DotsHorizontal } from '@heathmont/moon-icons-tw';


type Props = {
	title: string;
	percentage: number;
	progressColor: string;
	progressCount: string;
	pic: StaticImageData;
	peopleCount: string;
	tickCount: string;
	totalTickCount: string;
};

const Card = ({
	title,
	percentage,
	progressColor,
	progressCount,
	pic,
	peopleCount,
	tickCount,
	totalTickCount,
}: Props) => {
	return (
		<div className='p-3 w-60 rounded-lg bg-gray-50'>
			<div className='flex items-center justify-between'>
				<p className='font-bold text-black'>{title}</p>
				<Other3DotsHorizontal
					width={35}
					height={25}
				/>
			</div>

			<div className='flex items-center justify-between mt-4'>
				<p className='text-gray-500 text-xs'>Progress</p>
				<p className='font-semibold text-black'>{progressCount}</p>
			</div>

			<Progress
				value={percentage}
				size='4xs'
				progressColor={progressColor}
				bgColor='bg-gray-400'
				className='mt-2'
			/>

			<div className='flex items-center justify-between mt-4 w-[170px]'>
				<div className='flex items-center space-x-1'>
					<Tick width='16' height='17'/>
					<p className='text-xs'>
						<span className='font-semibold'>{tickCount}</span>/{totalTickCount}
					</p>
				</div>

				<div className='relative'>
					<Image
						src={pic}
						alt='pic alt'
						height={25}
						width={25}
						className='border-white border-2 rounded-full'
					/>

					<Image
						src={pic}
						alt='pic alt'
						height={25}
						width={25}
						className='absolute left-4 top-0 border-white border-2 rounded-full'
					/>

					<span className='absolute left-8 rounded-full border-white border-2 top-0 text-xs bg-gray-200 p-1'>
						+{peopleCount}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
