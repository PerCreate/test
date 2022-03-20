import { Movie } from "js/page/Main";
import { rootReducerState } from "js/redux/rootReducer";
import { getBaseURL } from "js/utils/Utils";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import MovieItem from "./MovieItem";

const MovieItemsList = ({ movies, itemsPerPage = movies.length, search = null }) => {
	const [isFirstItem, setIsFirstItem] = useState(true);
	const [isLastItem, setIsLastItem] = useState(false);
	const [isSmallList, setIsSmallList] = useState(false);
	const [indexFirstListItem, setIndexFirstListItem] = useState(0);
	const [moviesShow, setMoviesShow] = useState([...movies]);
	const path = getBaseURL();

	useEffect(() => {
		if (itemsPerPage <= 4 && !search) {
			setDefault();
		} else setMoviesShow(movies);
	}, []);

	useEffect(() => {
		if (indexFirstListItem === 0) setIsFirstItem(true);
		else setIsFirstItem(false);

		if (indexFirstListItem + itemsPerPage >= movies.length) setIsLastItem(true);
		else setIsLastItem(false);
	}, [indexFirstListItem]);

	useEffect(() => {
		if (!!search) {
			const filteredMovies: Movie[] = movies.filter((movie: Movie) =>
				movie.title.match(search)
			);
			setMoviesShow(filteredMovies);
			checkSizeList();
		} else setDefault();
	}, [search]);

	const setDefault = () => {
		const newMovieList = movies.slice(0, itemsPerPage);
		setMoviesShow(newMovieList);
		setIsFirstItem(true);

		checkSizeList();
	};

	const checkSizeList = () => {
		if (itemsPerPage >= movies.length) {
			setIsLastItem(true);
			setIsSmallList(true);
		} else if (moviesShow.length <= itemsPerPage) {
			setIsSmallList(true);
		}
	};

	const onArrowLeft = () => {
		if (!isFirstItem) {
			const newMovieList = movies.slice(
				indexFirstListItem - 1,
				indexFirstListItem - 1 + itemsPerPage
			);
			setIndexFirstListItem((prev) => prev - 1);
			setMoviesShow(newMovieList);
		}
	};
	const onArrowRight = () => {
		if (!isLastItem) {
			const newMovieList = movies.slice(
				indexFirstListItem + 1,
				indexFirstListItem + 1 + itemsPerPage
			);
			setIndexFirstListItem((prev) => prev + 1);
			setMoviesShow(newMovieList);
		}
	};

	return (
		<div className={`MovieItemsList ${isSmallList ? "_small" : ""}`}>
			{itemsPerPage <= 4 && (
				<>
					{!isFirstItem && !search && (
						<div className="arrow-left" onClick={() => onArrowLeft()}></div>
					)}
					{!isLastItem && !search && (
						<div className="arrow-right" onClick={() => onArrowRight()}></div>
					)}
				</>
			)}
			{moviesShow.map((movie: Movie) => (
				<MovieItem
					img={path + "/w780" + movie.backdrop_path}
					title={movie.title}
					description={movie.overview}
					key={movie.id}
					to={`about/${movie.id}`}
				/>
			))}
		</div>
	);
};

const mapState = (state: rootReducerState) => {
	return {
		search: state.searchMovie,
	};
};

export default connect(mapState)(MovieItemsList);
