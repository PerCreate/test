const Checkbox = ({ classes = null, callback, name, checked }) => {
	return (
		<div className="Checkbox">
			<input
				type="checkbox"
				checked={checked}
				onChange={callback}
				id="box"
			/>
			<label htmlFor="box">{name}</label>
		</div>
	);
};

export default Checkbox;
