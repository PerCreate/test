import { Dispatch, SetStateAction } from "react";

export type dispatch = Dispatch<SetStateAction<boolean>>;
export type voidCb = () => void;

interface ButtonProps {
	classes?: string;
	callback: dispatch | voidCb;
	name: string;
	disabled?: boolean;
}

const Button = ({ classes, callback, name, disabled }: ButtonProps) => {
	const onCb = () => {
		if (!disabled) {
			callback(true);
		}
	};

	return (
		<div className={`Button ${disabled ? "_disabled " : ""}` + classes} onClick={() => onCb()}>
			{name}
		</div>
	);
};

export default Button;
