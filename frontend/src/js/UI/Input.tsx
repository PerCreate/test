const Input = ({ classes = null, onInput, placeholder, value }) => {
	return (
		<input
			className="Input"
			type="text"
			placeholder={placeholder}
			onInput={onInput}
			value={value}
		/>
	);
};

export default Input;
