import MovieItem from "js/components/MovieItem";
import Button from "js/UI/Button";
import { useState } from "react";

const Header = (props) => {
	const onSearch = (e) => {};

	return (
		<header className="Header">
			<div className="Header-logo"></div>
			<div className="Header-search">
				<input
					type="text"
					placeholder="Поиск..."
					className="search-input"
				/>
				<Button
					classes="_flat _ml15"
					callback={onSearch}
					name="Найти"
				/>
			</div>
			<div className="Header-controls">
				<Button callback={onSearch} name="Войти" />
			</div>
			<MovieItem
				url={"batman.svg"}
				title={"Однажды... в Голливуде"}
				description="Фильм повествует о череде событий, произошедших в Голливуде в 1969 году, на закате его «золотого века». Известный актер Рик Далтон и его дублер Клифф Бут пытаются найти свое место в стремительно меняющемся мире киноиндустрии."
			/>
		</header>
	);
};
export default Header;
