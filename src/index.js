import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Nav from './js/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './js/Sidebar/Sidebar';
import Main from './js/Main';

import './css/Main.scss';
import './css/Modifiers.scss';
import './css/Mixins.scss';
import './css/Windows/BookEvent.scss';
import BookEvent from './js/shared/Windows/BookEvent';
import { Emitter } from './js/Listener';

const emitter = new Emitter();

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Main emitter={emitter} />
			<BookEvent emitter={emitter} />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
