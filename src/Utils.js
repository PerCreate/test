
export function getRandomNumbers(min, max, numberCount) {
	var arr = [];

	const getRandomNumber = () => {
		const temp = Math.floor(Math.random() * (max - min + 1) + min);
		if (arr.includes(temp)) return getRandomNumber();
		else return temp;
	};

	for (let index = 0; index < numberCount; index++) {
		const number = getRandomNumber();
		arr.push(number);
	}
	return arr;
}

export const getRandomNumbersObject = () => ({
	firstField: [...getRandomNumbers(1, 19, 8)],
	secondField: [...getRandomNumbers(1, 2, 1)],
});

const winConditionsDefault = [
	{
		firstField: 4,
	},
	{
		firstField: 3,
		secondField: 1,
	},
];

export function compareValues(userChoice, randomChoice, winConditions = winConditionsDefault) {
	const fieldsUser = Object.keys(userChoice);
	const fieldsRandom = Object.keys(randomChoice);
	if (fieldsUser.length !== fieldsRandom.length) throw new Error("Fields aren't equal");

	const result = {};

	fieldsUser.forEach((field) => {
		if (!randomChoice[field]) throw new Error(`random choice hasn\'t ${field} field`);
		const intersections = userChoice[field].filter((number) => {
			return randomChoice[field].includes(number);
		});

		result[field] = intersections.length;
	});

	for (let index = 0; index < winConditionsDefault.length; index++) {
		const condition = winConditionsDefault[index];
		const condFields = Object.keys(condition);

		const tempResult = condFields.filter((field) => {
			return result[field] >= condition[field];
		});

		if (condFields.length === tempResult.length) {
			return true;
		}
	}

	return false;
}

export function debounce(fn, delay) {
	var timer = null;
	console.log(fn);
	return function () {
		var context = this;
		var args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};
}