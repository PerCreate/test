import GenresItem from "js/components/GenresItem";
import MovieItem from "js/components/MovieItem";
import Button from "js/UI/Button";
import Input from "js/UI/Input";
import { debounce, getAPI, getBaseURL } from "js/utils/Utils";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { rootReducerState } from "js/redux/rootReducer";
import { onSearchAction } from "js/redux/actions";

const Header = ({ onSearchAction = null }) => {
	const [searchValue, setSearchValue] = useState("");
	//working не работает debounce
	const onSearch = useCallback(
		debounce(() => onSearchAction({ searchMovie: searchValue }), 500),
		[searchValue]
	);

	useEffect(() => {
		onSearch();
	}, [searchValue]);

	const onInput = (event) => {
		const value = event.target.value;
		setSearchValue(value);
	};

	return (
		<header className="Header">
			<NavLink className="Header-logo" to="/main">
				{}
			</NavLink>
			<div className="Header-search">
				<Input onInput={onInput} placeholder="Поиск..." value={searchValue} />
				<Button
					classes="_flat _ml15"
					callback={() => onSearchAction({ searchMovie: searchValue })}
					name="Найти"
				/>
			</div>
			<div className="Header-controls">
				<Button callback={onSearch} name="Войти" />
			</div>
		</header>
	);
};

const mapDispatch = {
	onSearchAction,
};

export default connect(null, { onSearchAction })(Header);
