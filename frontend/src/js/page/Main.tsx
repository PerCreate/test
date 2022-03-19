import axios from "axios";
import GenresItemsList from "js/components/GenreItemsList";
import MovieItemsList from "js/components/MovieItemsList";
import { rootReducerState } from "js/redux/rootReducer";
import { getAPI } from "js/utils/Utils";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

export interface Movie {
	id: number;
	title: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
}

const tabs = {
	movie: "Фильмы",
	channels: "Телеканалы",
};

const genres = [
	{
		type: "horror",
		title: "horror",
		img: "emoji/horror.svg",
	},
	{
		type: "comedy",
		title: "comedy",
		img: "emoji/comedy.svg",
	},
	{
		type: "drams",
		title: "drams",
		img: "emoji/drams.svg",
	},
	{
		type: "fantasy",
		title: "fantasy",
		img: "emoji/fantasy.svg",
	},
];

const Main = ({ children = null }) => {
	const [activeTab, setActiveTab] = useState(tabs.movie);
	const [isLoading, setLoading] = useState(true);
	const [moviesList, setMoviesList] = useState<Movie[]>([]);

	useEffect(() => {
		const getData = async () => {
			const dataMovie = await axios.get(getAPI("movie/popular", ""));
			setMoviesList(dataMovie.data.results as Movie[]);
			setLoading(false);
		};
		getData();
	}, []);

	if (isLoading) {
		return <div className="Loader"></div>;
	}

	return (
		<div className="Main">
			<div className="Main-tabs">
				{Object.keys(tabs).map((tab: string, index: number) => {
					return (
						<NavLink key={tab + index} className={`tab`} to={`${tab}`}>
							{tabs[tab]}
						</NavLink>
					);
				})}
			</div>
			<Routes>
				<Route
					path="/movie"
					element={
						<>
							<div className="Main-list-title">🔥 Новинки</div>
							<MovieItemsList movies={moviesList} itemsPerPage={4} />
							<GenresItemsList genres={genres} />
						</>
					}
				/>
				<Route path="/" element={<Navigate to="/main/movie" />} />
			</Routes>
		</div>
	);
};

export default connect()(Main);
