import { useState } from "react";
import Field from "./Field";

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


function App() {
	const [firstFieldChosen, setFirstFieldChosen] = useState([]);

	const onChooseFirstField = () => {

	};

	return (
		<div className="App">
			<Field range={{ firstNumber: 1, lastNumber: 19 }} onChoose={onChooseFirstField} />
		</div>
	);
}

export default App;
