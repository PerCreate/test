const Button = ({ classes = null, callback, name, disabled = false }) => {
	const onCb = (e) => {
		if (!disabled) {
			callback(e);
		}
	};

	return (
		<div
			className={`Button ${disabled ? "_disabled " : ""}` + classes}
			onClick={(e) => onCb(e)}
		>
			{name}
		</div>
	);
};

export default Button;
