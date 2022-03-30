import { useState } from "react";
import { useEffect } from "react";

const Field = ({ range, onChoose, maxChoose, currentChosen }) => {
	const [field, setField] = useState([]);
	const { firstNumber, lastNumber } = range;

	useEffect(() => {
		const tempField = [];
		for (let i = firstNumber; i <= lastNumber; i += 1) {
			tempField.push(i);
		}
		setField(tempField);
	}, [firstNumber, lastNumber]);

	const onChooseCell = (cell, doUnsetCell) => {
		if (currentChosen.length < maxChoose || doUnsetCell) {
			onChoose(cell, doUnsetCell);
		}
	};

	return (
		<div className="Field">
			{field.map((cell, index) => {
				const chosen = currentChosen.includes(cell);
				return (
					<div
						onClick={() => onChooseCell(cell, chosen)}
						key={cell + index}
						className={`Field-cell ${chosen ? "_chosen" : ""}`}
					>
						{cell}
					</div>
				);
			})}
		</div>
	);
};

export default Field;
