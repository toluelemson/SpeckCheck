import React, { useState } from 'react';
import { ControlsEye, ControlsEyeCrossed } from '@heathmont/moon-icons-tw';

type InputProps = {
	placeHolder: string;
	inputType: string;
	icon: React.ComponentType<{
		height: number;
		width: number;
		color: string;
		className: string;
	}>;
};

const Input: React.FC<InputProps> = ({
	icon: IconComponent,
	inputType,
	placeHolder,
}) => {
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleToggleVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className='flex bg-white items-center justify-center border rounded-lg h-12'>
			{IconComponent && (
				<IconComponent
					height={35}
					width={35}
					color='gray'
					className='mx-2'
				/>
			)}
			<input
				name={inputType}
				type={
					inputType === 'password'
						? showPassword
							? 'text'
							: 'password'
						: inputType
				}
				autoComplete={inputType}
				placeholder={placeHolder}
				value={password}
				onChange={handlePasswordChange}
				required
				className='h-10 w-full borderless-input'
			/>

			{inputType === 'password' && (
				<button
					type='button'
					onClick={handleToggleVisibility}>
					{showPassword ? (
						<ControlsEye
							height={35}
							width={35}
							color='gray'
							className='m-1'
						/>
					) : (
						<ControlsEyeCrossed
							height={35}
							width={35}
							color='gray'
							className='m-1'
						/>
					)}
				</button>
			)}
		</div>
	);
};

export default Input;
