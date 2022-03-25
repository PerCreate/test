import Button from "js/UI/Button";

type WindowProps = {
	children?: any;
	title?: string;
	centerTitle?: boolean;
	isShowWindow: boolean;
	controlSuccessName?: string;
	onSuccess?: () => void;
	onClose?: () => void;
};

const Window = ({
	children,
	title,
	centerTitle,
	isShowWindow,
	onSuccess = () => {},
	onClose,
	controlSuccessName,
}: WindowProps) => {
	if (!isShowWindow) {
		return null;
	}

	const onCloseWindow = () => {
		onClose && onClose();
	};

	return (
		<div className="Window-overlay" onClick={onCloseWindow}>
			<div className="Window-body _flAlignCol" onClick={(e) => e.stopPropagation()}>
				<div className="Window-header">
					<div className={`Window-title ${centerTitle ? "_center" : ""}`}>{title}</div>
					{/* <div className="Window-close"></div> */}
				</div>
				<div className="Window-content _flAlignCol _alignStart">{children}</div>
				{!!controlSuccessName && (
					<div className="Window-controls">
						<Button callback={onSuccess} name={controlSuccessName} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Window;
