import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";
import reportWebVitals from "./reportWebVitals";
import "./css/Root.scss";
import { compose, createStore } from "redux";
import { rootReducer } from "js/redux/rootReducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
reportWebVitals();
