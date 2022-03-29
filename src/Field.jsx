import { useState } from "react";
import { useEffect } from "react";

const Field = ({ range, onChoose }) => {
	const [field, setField] = useState([]);
	const { firstNumber, lastNumber } = range;

	useEffect(() => {
		const tempField = [];
		for (let i = firstNumber; i <= lastNumber; i += 1) {
			tempField.push(i);
		}
		setField(tempField);
	}, [firstNumber, lastNumber]);

	return (
		<div className="Field">
			{field.map((cell, index) => {
				return (
					<div onClick={onChoose(cell)} key={cell + index} className="Field-cell">
						{cell}
					</div>
				);
			})}
		</div>
	);
};

export default Field;
