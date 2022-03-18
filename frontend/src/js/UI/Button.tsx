const Button = ({ classes = null, callback, name }) => {
	return (
		<div className={`Button ` + classes} onClick={(e) => callback(e)}>
			{name}
		</div>
	);
};

export default Button;
