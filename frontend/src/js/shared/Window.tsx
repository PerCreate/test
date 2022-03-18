const Window = ({ children }) => {
	return (
		<div className="Window">
			<div className="Window-overlay"></div>
			<div className="Window-content">{children}</div>
		</div>
	);
};

export default Window;
