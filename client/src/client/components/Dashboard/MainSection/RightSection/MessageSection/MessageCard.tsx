import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { truncateText } from '@/src/shared/utils/TruncateText';

type Props = {
    image: StaticImageData;
    time: string;
    name: string;
    text: string;
    online: boolean
}

const MessageCard = ({ image, time, name, text, online }: Props) => {
    const textMsg = truncateText(text, 30);
	return (
		<div className='flex items-start justify-between bg-white rounded-lg space-y-4'>
			<div className='flex items-center justify-between space-x-2'>
				<div className='relative'>
					<Image
						src={image}
						alt='pic alt'
                    />
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${online ? 'bg-green-300' : 'bg-gray-300'} `}></span>
				</div>

				<div className='flex flex-col items-start justify-start'>
					<p className='font-bold'>{name}</p>
					<p className='text-xs'>{textMsg}</p>
				</div>
			</div>
			<p className='text-xs -mt-4'>{time}</p>
		</div>
	);
};

export default MessageCard;
