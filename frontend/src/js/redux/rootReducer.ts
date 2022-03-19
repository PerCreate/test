interface rootReducerState {
	isAuth: boolean;
}

const getAuth = (): boolean => {
	return !!JSON.parse(localStorage.getItem('user_token'));
};

const initialState = {
	isAuth: getAuth()
};


export const rootReducer = (state: rootReducerState = initialState, action) => ({

});