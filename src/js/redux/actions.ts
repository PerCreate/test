export interface data {
	searchMovie?: string;
	user_token?: string;
	userName?: string;
	rememberMe?: boolean;
	movieId?: number;
	newComments?: comment[];
}

export interface action {
	type: string | number;
	data: data;
}

import { comment } from "js/page/About";
import { LOG_OUT, SEARCH_MOVIE, SET_NEW_COMMENTS, SIGN_IN, USER_NAME_INPUT } from "./types";

export const onSearchAction = (data: data) => {
	return {
		type: SEARCH_MOVIE,
		data: data
	};
};

export const onSignIn = (data: data) => {
	return {
		type: SIGN_IN,
		data: data
	};
};

export const onLogOut = (data: data) => {
	return {
		type: LOG_OUT,
		data: data
	};
};

export const onUserNameInput = (data: data) => {
	return {
		type: USER_NAME_INPUT,
		data: data
	};
};

export const setNewComments = (data: data) => {
	return {
		type: SET_NEW_COMMENTS,
		data: data
	};
};