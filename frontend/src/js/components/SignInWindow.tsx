import axios from "axios";
import { onSignIn } from "js/redux/actions";
import Window from "js/shared/Window";
import Checkbox from "js/UI/Checkbox";
import Input from "js/UI/Input";
import { getAPI } from "js/utils/Utils";
import { useState } from "react";
import { connect } from "react-redux";

const SignInWindow = ({ isOpen, onClose, dispatchSignIn }) => {
	const [loginValue, setLoginValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	//working validate
	const onSignIn = () => {
		const getData = async () => {
			try {
				const data = await axios.get(getAPI("/authentication/token/new", ""));
				dispatchSignIn({ user_token: data.data.request_token, rememberMe });
				onCloseWindow();
			} catch (e) {
				console.log(e);
			}
		};
		getData();
	};

	if (!isOpen) {
		return null;
	}

	const onCloseWindow = () => {
		setLoginValue("");
		setPasswordValue("");
		onClose();
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
						classes="_small"
						onInput={(e) => setLoginValue(e.target.value)}
						placeholder="Логин"
						value={loginValue}
					/>
					<Input
						classes="_mt24 _small"
						onInput={(e) => setPasswordValue(e.target.value)}
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
