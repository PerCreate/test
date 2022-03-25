interface CheckboxProps {
	classes?: string;
	callback: () => void;
	name: string;
	checked: boolean;
}

const Checkbox = ({ classes, callback, name, checked }: CheckboxProps) => {
	return (
		<div className={`Checkbox ${classes}`}>
			<input type="checkbox" checked={checked} onChange={callback} id="box" />
			<label htmlFor="box">{name}</label>
		</div>
	);
};

export default Checkbox;
