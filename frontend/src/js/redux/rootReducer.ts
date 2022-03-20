import { action } from "./actions";
import { LOG_OUT, SEARCH_MOVIE, SIGN_IN, USER_NAME_INPUT } from "./types";

export interface rootReducerState {
	user_token: string;
	userName?: string;
	searchMovie?: string;
	showWindow?: boolean;
}

const getAuth = (): string => {
	return localStorage.getItem('user_token') || null;
};

const getName = (): string => {
	return localStorage.getItem('userName') || '';
};

const initialState = {
	user_token: getAuth(),
	searchMovie: '',
	userName: getName()
};

export const rootReducer = (state: rootReducerState = initialState, action: action) => {
	switch (action.type) {
		case SEARCH_MOVIE:
			return {
				...state,
				searchMovie: action.data.searchMovie
			};
		case SIGN_IN:
			if (action.data.rememberMe) {
				localStorage.setItem("user_token", action.data.user_token);
			}
			return {
				...state,
				user_token: action.data.user_token
			};
		case LOG_OUT:
			localStorage.removeItem("user_token");
			localStorage.removeItem("userName");
			return {
				...state,
				user_token: null
			};
		case USER_NAME_INPUT:
			localStorage.setItem("userName", action.data.userName);
			return {
				...state,
				userName: action.data.userName
			};
		default:
			return state;
	}
};