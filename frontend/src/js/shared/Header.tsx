import GenresItem from "js/components/GenresItem";
import MovieItem from "js/components/MovieItem";
import Button from "js/UI/Button";
import Input from "js/UI/Input";
import { debounce, getAPI, getBaseURL } from "js/utils/Utils";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Header = (props) => {
	const [searchValue, setSearchValue] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [list, setList] = useState([]);

	const setFilter = () => {
		// setList(["1", "2"]);
	};

	const getData = async () => {
		const { data } = await axios.get(getAPI("movie/popular", ""));
		setList(data.result);
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	const onSearch = useCallback(debounce(setFilter, 1000), []);

	const onInput = (event) => {
		setSearchValue(event.target.value);
		onSearch();
	};

	return (
		<header className="Header">
			<NavLink className="Header-logo" to="/main/movie">
				{}
			</NavLink>
			<div className="Header-search">
				<Input onInput={onInput} placeholder="Поиск..." value={searchValue} />
				<Button classes="_flat _ml15" callback={setFilter} name="Найти" />
			</div>
			<div className="Header-controls">
				<Button callback={onSearch} name="Войти" />
			</div>
			{/* {list.map((film: Film) => {
				const { id, title, backdrop_path, overview, release_date } = film;
			})} */}
		</header>
	);
};
export default Header;
