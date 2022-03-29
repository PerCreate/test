import { comment } from './../page/About';
import { action } from "./actions";
import { LOG_OUT, SEARCH_MOVIE, SET_NEW_COMMENTS, SIGN_IN, USER_NAME_INPUT } from "./types";

export interface rootReducerState {
	user_token: string;
	userName: string;
	searchMovie?: string;
	showWindow?: boolean;
	comments:
	{ [movieId: number]: comment[]; }
	;
}

const getAuth = (): string => {
	return localStorage.getItem('user_token') || '';
};

const getName = (): string => {
	return localStorage.getItem('userName') || '';
};

const getComments = (): { [movieId: number]: comment[]; } | {} => {
	const comments = localStorage.getItem('comments');
	return comments ? JSON.parse(comments) : {};
};

const initialState = {
	user_token: getAuth(),
	searchMovie: '',
	userName: getName(),
	comments: getComments()
};

export const rootReducer = (state: rootReducerState = initialState, action: action): rootReducerState => {
	if (state === undefined) {
		return initialState;
	}

	switch (action.type) {
		case SEARCH_MOVIE:
			return {
				...state,
				searchMovie: action.data.searchMovie
			};
		case SIGN_IN:
			if (action.data.rememberMe) {
				localStorage.setItem("user_token", action.data.user_token || '');
			}
			return {
				...state,
				user_token: action.data.user_token || ''
			};
		case LOG_OUT:
			localStorage.removeItem("user_token");
			localStorage.removeItem("userName");
			return {
				...state,
				user_token: '',
				userName: ''
			};
		case USER_NAME_INPUT:
			localStorage.setItem("userName", action.data.userName || '');
			return {
				...state,
				userName: action.data.userName || ''
			};
		case SET_NEW_COMMENTS:
			const movieId = action.data.movieId as number;
			if (!state.comments) {
				state.comments = {};
			}
			if (state.comments[movieId]) {
				state.comments[movieId] = [...state.comments[movieId], ...action.data.newComments || []];
			} else {
				state.comments[movieId] = [...action.data.newComments || []];
			}
			localStorage.setItem("comments", JSON.stringify(state.comments));
			return {
				...state
			};
		default:
			return state;
	}
};