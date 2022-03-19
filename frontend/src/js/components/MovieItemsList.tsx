import { Movie } from "js/page/Main";
import { getBaseURL } from "js/utils/Utils";
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";

const MovieItemsList = ({ movies, itemsPerPage = movies.length }) => {
	const [isFirstItem, setIsFirstItem] = useState(true);
	const [isLastItem, setIsLastItem] = useState(false);
	const [indexFirstListItem, setIndexFirstListItem] = useState(0);
	const [moviesShow, setMoviesShow] = useState([...movies]);
	const path = getBaseURL();

	useEffect(() => {
		if (itemsPerPage <= 4) {
			const newMovieList = movies.slice(0, itemsPerPage);
			setMoviesShow(newMovieList);
			setIsFirstItem(true);

			if (itemsPerPage >= movies.length) {
				setIsLastItem(true);
			}
		} else setMoviesShow(movies);
	}, []);

	useEffect(() => {
		if (indexFirstListItem === 0) {
			setIsFirstItem(true);
		} else {
			setIsFirstItem(false);
		}
		if (indexFirstListItem + itemsPerPage >= movies.length) {
			setIsLastItem(true);
		} else {
			setIsLastItem(false);
		}
	}, [indexFirstListItem]);

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
		<div className="MovieItemsList">
			{itemsPerPage <= 4 && (
				<>
					{!isFirstItem && (
						<div className="arrow-left" onClick={() => onArrowLeft()}></div>
					)}
					{!isLastItem && (
						<div className="arrow-right" onClick={() => onArrowRight()}></div>
					)}
				</>
			)}
			{moviesShow.map((movie: Movie) => (
				<MovieItem
					img={path + "/w500" + movie.backdrop_path}
					title={movie.title}
					description={movie.overview}
					key={movie.id}
				/>
			))}
		</div>
	);
};

export default MovieItemsList;
