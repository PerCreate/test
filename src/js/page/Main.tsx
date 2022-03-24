import axios from "axios";
import GenresItemsList from "js/components/GenreItemsList";
import Loader from "js/components/Loader";
import MainTabs from "js/components/MainTabs";
import MovieItemsList from "js/components/MovieItemsList";
import { rootReducerState } from "js/redux/rootReducer";
import { getAPI, isMobDevice780, isMobDevice970, isViewportMiddleSize } from "js/utils/Utils";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import About from "./About";

export interface Movie {
	id: number;
	title: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
	genres?: [{ id: number; name: string }];
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
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const checkViewportSize = () => {
		if (isViewportMiddleSize()) {
			setItemsPerPage(3);
		} else {
			setItemsPerPage(4);
		}
		if (isMobDevice970()) {
			setItemsPerPage(6);
		}
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const dataMovie = await axios.get(getAPI("movie/popular", ""));

				if (isMobDevice780()) {
					setItemsPerPage(dataMovie.data.results.length);
				} else {
					checkViewportSize();
				}

				setMoviesList(dataMovie.data.results as Movie[]);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};
		getData();
	}, []);

	if (isLoading) {
		return (
			<div className="Main">
				<Loader />
			</div>
		);
	}

	return (
		<div className="Main">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<MainTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
							{activeTab === tabs["movie"] && (
								<>
									<div className="Main-list-title">🔥 Новинки</div>
									<MovieItemsList
										movies={moviesList}
										itemsPerPage={itemsPerPage}
									/>
									<GenresItemsList genres={genres} />
								</>
							)}
						</>
					}
				/>
				<Route path="about/:id" element={<About />} />
			</Routes>
		</div>
	);
};

export default connect()(Main);
