const Input = ({ classes = null, onInput, placeholder, value, onBlur = null }) => {
	const blur = (e) => {
		onBlur && onBlur(e);
	};

	return (
		<input
			className={`Input ${classes}`}
			type="text"
			placeholder={placeholder}
			onInput={onInput}
			value={value}
			onBlur={(e) => blur(e)}
		/>
	);
};

export default Input;
