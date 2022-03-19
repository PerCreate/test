export interface data {
	searchMovie: string;
}

export interface action {
	type: string;
	data: data;
}

import { SEARCH_MOVIE } from "./types";

export const onSearchAction = (data: data) => {
	return {
		type: SEARCH_MOVIE,
		data: data
	};
};