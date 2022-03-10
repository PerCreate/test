
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import BathEvents from './BathNews/BathEvents';
import Nav from './Nav';
import Sidebar from './Sidebar/Sidebar';
import { Emitter } from './Listener';
import BookEvent from './shared/Windows/BookEvent';
import { useState } from 'react';

const Main = (props) => {
	const { emitter } = props;

	return <main className="container">
		<Nav emitter={emitter} />
		<div className="row gap-articles">
			<Routes>
				<Route path="/bath-news/*" element={<Sidebar emitter={emitter} />}>
				</Route>
			</Routes>
		</div>
	</main>;
};

export default Main;