import MovieItem from "js/components/MovieItem";
import Button from "js/UI/Button";
import Input from "js/UI/Input";
import { debounce } from "js/utils/Utils";
import { useCallback, useEffect, useState } from "react";

const Header = (props) => {
	const [searchValue, setSearchValue] = useState("");
	const [list, setList] = useState([]);

	const setFilter = () => {
		setList(["1", "2"]);
	};

	const onSearch = useCallback(debounce(setFilter, 1000), []);

	const onInput = (event) => {
		setSearchValue(event.target.value);
		onSearch();
	};

	return (
		<header className="Header">
			<div className="Header-logo"></div>
			<div className="Header-search">
				<Input
					onInput={onInput}
					placeholder="Поиск..."
					value={searchValue}
				/>
				<Button
					classes="_flat _ml15"
					callback={setFilter}
					name="Найти"
				/>
			</div>
			<div className="Header-controls">
				<Button callback={onSearch} name="Войти" />
			</div>
			<MovieItem
				img={"batman.svg"}
				title={"Однажды... в Голливуде"}
				description="Фильм повествует о череде событий, произошедших в Голливуде в 1969 году, на закате его «золотого века». Известный актер Рик Далтон и его дублер Клифф Бут пытаются найти свое место в стремительно меняющемся мире киноиндустрии."
			/>
		</header>
	);
};
export default Header;
