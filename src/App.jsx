import { useEffect } from "react";
import { useState } from "react";
import Field from "./Field";
import { compareValues, debounce, getRandomNumbersObject } from "./Utils";

const winConditions = [
	{
		firstField: 4,
	},
	{
		firstField: 3,
		secondField: 1,
	},
];

function App() {
	const [firstFieldChosen, setFirstFieldChosen] = useState([]);
	const [secondFieldChosen, setSecondFieldChosen] = useState([]);
	const [isResultAvailable, setResultAvailable] = useState(false);
	const [error, setError] = useState(null);
	const [randomNumbers, setRandomNumbers] = useState(getRandomNumbersObject());

	useEffect(() => {
		if (firstFieldChosen.length === 8 && secondFieldChosen.length === 1) {
			setResultAvailable(true);
		} else {
			setResultAvailable(false);
		}
	}, [firstFieldChosen, secondFieldChosen]);

	const onChooseFirstField = (cell, doUnsetCell) => {
		if (doUnsetCell) {
			setFirstFieldChosen((prev) => [...prev.filter((cellChosen) => cellChosen !== cell)]);
			return;
		}
		setFirstFieldChosen((prev) => [...prev, cell]);
	};

	const onChooseSecondField = (cell, doUnsetCell) => {
		if (doUnsetCell) {
			setSecondFieldChosen((prev) => [...prev.filter((cellChosen) => cellChosen !== cell)]);
			return;
		}
		setSecondFieldChosen((prev) => [...prev, cell]);
	};

	const getResult = async () => {
		if (!isResultAvailable) {
			return;
		}
		const userChoice = {
			firstField: [...firstFieldChosen],
			secondField: [...secondFieldChosen],
		};
		const isTicketWon = compareValues(userChoice, randomNumbers, winConditions);
		await sentRequest(userChoice, isTicketWon, 2);
	};

	const sentRequest = async (userChoice, isTicketWon, repeat) => {
		let currentTry = 1;
		const get = async () => {
			try {
				await fetch("https://rocknblock.io/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...userChoice, isTicketWon }),
				});
			} catch (e) {
				if (currentTry <= repeat) {
					setTimeout(() => get(), 2000);
				} else {
					setError(e);
				}
			}
		};

		get();
	};

	const randomNumbersHandler = () => {
		setRandomNumbers(getRandomNumbersObject());
	};

	return (
		<div className="App">
			<div className="Ticket">
				<div className="title">Билет 1</div>
				<div className="wand" onClick={() => randomNumbersHandler()}></div>
			</div>
			<div className="Ticket-info">Поле 1 Отметьте 8 чисел.</div>
			<Field
				range={{ firstNumber: 1, lastNumber: 19 }}
				maxChoose={8}
				currentChosen={firstFieldChosen}
				onChoose={onChooseFirstField}
			/>
			<div className="Ticket-info">Поле 2 Отметьте 1 число.</div>
			<Field
				range={{ firstNumber: 1, lastNumber: 2 }}
				maxChoose={1}
				currentChosen={secondFieldChosen}
				onChoose={onChooseSecondField}
			/>
			<div
				className={`Result ${isResultAvailable ? "" : "_disable"}`}
				onClick={() => getResult()}
			>
				Показать результат
			</div>
			{error && (
				<div className="Error">
					{error}
					<div className="close" onClick={() => setError(null)}>
						Close
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
