import axios from "axios";
import { onSignIn } from "js/redux/actions";
import Window from "js/shared/Window";
import Checkbox from "js/UI/Checkbox";
import Input from "js/UI/Input";
import { getAPI } from "js/utils/Utils";
import { useState } from "react";
import { connect } from "react-redux";

interface inputState {
	login: { validate: boolean };
	password: { validate: boolean };
}

const SignInWindow = ({ isOpen, onClose, dispatchSignIn }) => {
	const [loginValue, setLoginValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [inputState, setInputState] = useState<inputState>({
		login: { validate: true },
		password: { validate: true },
	});
	const [rememberMe, setRememberMe] = useState(false);
	//working validate
	const onSignIn = () => {
		const getData = async () => {
			try {
				const data = await axios.get(getAPI("/authentication/token/new", ""));
				if (validateData(loginValue, passwordValue)) {
					dispatchSignIn({ user_token: data.data.request_token, rememberMe });
					onCloseWindow();
				}
			} catch (e) {
				console.log(e);
			}
		};
		getData();
	};

	if (!isOpen) {
		return null;
	}

	const validateData = (login: string, password: string) => {
		if (login.length >= 6 && password.length >= 6) return true;

		var newInputState: inputState = {
			login: { validate: false },
			password: { validate: false },
		};

		if (login.length < 6) {
			newInputState = { ...newInputState, login: { validate: false } };
		}

		if (password.length < 6) {
			newInputState = { ...newInputState, password: { validate: false } };
		}
		setInputState(newInputState);
		window.setTimeout(
			() =>
				setInputState({
					login: { validate: true },
					password: { validate: true },
				}),
			1500
		);
		return false;
	};

	const onCloseWindow = () => {
		setLoginValue("");
		setPasswordValue("");
		onClose();
	};

	const onLoginInput = (e) => {
		setLoginValue(e.target.value);
	};

	const onPasswordInput = (e) => {
		setPasswordValue(e.target.value);
	};

	return (
		<Window
			title="Вход"
			centerTitle
			controlSuccessName="Войти"
			isShowWindow={isOpen}
			onSuccess={onSignIn}
			onClose={onCloseWindow}
		>
			{
				<>
					<Input
						classes={`_small ${inputState.login.validate ? "" : "_wrong"}`}
						onInput={(e) => onLoginInput(e)}
						placeholder="Логин"
						value={loginValue}
					/>
					<Input
						classes={`_mt24 _small ${inputState.password.validate ? "" : "_wrong"}`}
						onInput={(e) => onPasswordInput(e)}
						placeholder="Пароль"
						value={passwordValue}
					/>
					<Checkbox
						classes="_mt24"
						name="Запомнить"
						checked={rememberMe}
						callback={() => setRememberMe((prev) => !prev)}
					/>
				</>
			}
		</Window>
	);
};

const mapDispatch = {
	dispatchSignIn: onSignIn,
};

export default connect(null, mapDispatch)(SignInWindow);
