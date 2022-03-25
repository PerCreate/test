import Button from "js/UI/Button";
import Input from "js/UI/Input";
import { debounce, isMobDevice780, isViewportSmallerSize } from "js/utils/Utils";
import { FocusEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { rootReducerState } from "js/redux/rootReducer";
import { action, data, onLogOut, onSearchAction, onUserNameInput } from "js/redux/actions";
import SignInWindow from "js/components/SignInWindow";

interface HeaderProps {
	dispatchNameInput: (data: data) => action;
	dispatchSearch: (data: data) => action;
	dispatchGotOut: (data: data) => action;
	isAuth: boolean;
	userNameStorage: string;
}

const mapState = (state: rootReducerState) => {
	return {
		isAuth: !!state.user_token,
		userNameStorage: state.userName || "",
	};
};

const mapDispatch = {
	dispatchSearch: onSearchAction,
	dispatchNameInput: onUserNameInput,
	dispatchGotOut: onLogOut,
};

const Header = (props: HeaderProps) => {
	const [searchValue, setSearchValue] = useState("");
	const [userName, setUserName] = useState(props.userNameStorage);
	const [isSignInWindowOpen, onOpenSignInWindow] = useState(false);
	const [isSmallerViewportSize, setIsSmallerViewportSize] = useState(false);
	const [isDevice780, setIsDevice780] = useState(false);
	const { dispatchSearch, isAuth, dispatchNameInput, dispatchGotOut } = props;

	//working не работает debounce
	const onSearch = useCallback(
		debounce(() => dispatchSearch({ searchMovie: searchValue }), 500),
		[searchValue]
	);

	useEffect(() => {
		if (isMobDevice780()) {
			setIsDevice780(true);
		}
		if (isViewportSmallerSize()) {
			setIsSmallerViewportSize(true);
		}
	}, []);

	useEffect(() => {
		onSearch();
	}, [searchValue]);

	const onUserName = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		setUserName(value);
	};

	const onLogOut = () => {
		setUserName("");
		dispatchGotOut({});
	};

	const saveName = (e: FocusEvent<HTMLInputElement, Element>) => {
		dispatchNameInput({ userName: userName });
	};

	const onSearchInput = (e: FormEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		setSearchValue(value);
	};

	return (
		<header className="Header">
			<NavLink className="Header-logo" to="/main">
				{!isSmallerViewportSize && "Видеосервис"}
			</NavLink>
			<div className="Header-search">
				<Input onInput={onSearchInput} placeholder="Поиск..." value={searchValue} />
				{!isDevice780 && <Button classes="_flat _ml15" callback={onSearch} name="Найти" />}
			</div>
			<div className="Header-controls">
				{isAuth ? (
					<div className="_d-fl">
						<Input
							classes={"_name"}
							onInput={onUserName}
							placeholder="Введите имя..."
							value={userName}
							onBlur={saveName}
						/>
						<Button callback={onLogOut} name="Выйти" />
					</div>
				) : (
					<div className="_justifyEnd">
						<SignInWindow isOpen={isSignInWindowOpen} onClose={onOpenSignInWindow} />
						<Button callback={onOpenSignInWindow} name="Войти" />
					</div>
				)}
			</div>
		</header>
	);
};

export default connect(mapState, mapDispatch)(Header);
