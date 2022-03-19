import { action } from "./actions";
import { SEARCH_MOVIE } from "./types";

export interface rootReducerState {
	isAuth: boolean;
	searchMovie?: string;
}

const getAuth = (): boolean => {
	return !!JSON.parse(localStorage.getItem('user_token'));
};

const initialState = {
	isAuth: getAuth()
};


export const rootReducer = (state: rootReducerState = initialState, action: action) => {
	switch (action.type) {
		case SEARCH_MOVIE:
			return {
				...state,
				searchMovie: action.data.searchMovie
			};
		default:
			return state;
	}
};