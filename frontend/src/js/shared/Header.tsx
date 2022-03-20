import GenresItem from "js/components/GenresItem";
import MovieItem from "js/components/MovieItem";
import Button from "js/UI/Button";
import Input from "js/UI/Input";
import { debounce, getAPI, getBaseURL } from "js/utils/Utils";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { rootReducerState } from "js/redux/rootReducer";
import { action, data, onLogOut, onSearchAction, onUserNameInput } from "js/redux/actions";
import Window from "./Window";
import Checkbox from "js/UI/Checkbox";
import SignInWindow from "js/components/SignInWindow";

type HeaderProps = {
	dispatchNameInput: (data: data) => action;
	dispatchSearch: (data: data) => action;
	dispatchGotOut: (data: data) => action;
	isAuth: boolean;
	userNameStorage: string;
};

const Header = (props: HeaderProps) => {
	const [searchValue, setSearchValue] = useState("");
	const [userName, setUserName] = useState(props.userNameStorage);
	const [isSignInWindowOpen, onOpenSignInWindow] = useState(false);
	const { dispatchSearch, isAuth, dispatchNameInput, dispatchGotOut } = props;

	//working не работает debounce
	const onSearch = useCallback(
		debounce(() => dispatchSearch({ searchMovie: searchValue }), 500),
		[searchValue]
	);

	useEffect(() => {
		onSearch();
	}, [searchValue]);

	const onUserName = (e) => {
		const value = e.target.value;
		setUserName(value);
		dispatchNameInput({ userName: value });
	};

	const onCloseSignWindow = () => {
		onOpenSignInWindow(false);
	};

	const onLogOut = () => {
		setUserName("");
		dispatchGotOut({});
	};

	return (
		<header className="Header">
			<NavLink className="Header-logo" to="/main">
				{}
			</NavLink>
			<div className="Header-search">
				<Input
					onInput={(e) => setSearchValue(e.target.value)}
					placeholder="Поиск..."
					value={searchValue}
				/>
				<Button classes="_flat _ml15" callback={onSearch} name="Найти" />
			</div>
			<div className="Header-controls">
				{isAuth ? (
					<div className="_d-fl _w300">
						<Input
							classes={"_name"}
							onInput={(e) => onUserName(e)}
							placeholder="Введите имя..."
							value={userName}
						/>
						<Button callback={onLogOut} name="Выйти" />
					</div>
				) : (
					<div className="_w300 _justifyEnd">
						<SignInWindow isOpen={isSignInWindowOpen} onClose={onCloseSignWindow} />
						<Button callback={() => onOpenSignInWindow(true)} name="Войти" />
					</div>
				)}
			</div>
		</header>
	);
};

const mapState = (state: rootReducerState) => {
	return {
		isAuth: !!state.user_token,
		userNameStorage: state.userName,
	};
};

const mapDispatch = {
	dispatchSearch: onSearchAction,
	dispatchNameInput: onUserNameInput,
	dispatchGotOut: onLogOut,
};

export default connect(mapState, mapDispatch)(Header);
