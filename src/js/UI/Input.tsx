import { FormEvent } from "react";

interface InputProps {
	classes?: string;
	onInput: (e: FormEvent<HTMLInputElement>) => void;
	placeholder: string;
	disabled?: boolean;
	value: string;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = ({ classes, onInput, placeholder, value, onBlur }: InputProps) => {
	const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
		onBlur && onBlur(event);
	};

	return (
		<input
			className={`Input ${classes}`}
			type="text"
			placeholder={placeholder}
			onInput={onInput}
			value={value}
			onBlur={blurHandler}
		/>
	);
};

export default Input;
