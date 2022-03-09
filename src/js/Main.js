
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import '../css/Main.scss';
import BathEvents from './BathNews/BathEvents';
import Nav from './Nav';
import Sidebar from './Sidebar/Sidebar';

const Main = (props) => {
	const params = useLocation();
	console.log(params);

	return <main className="container">
		<Nav />
		<div className="row gap-articles">
			<Routes>
				<Route path="/bath-news/*" element={<Sidebar activePage={''} />}>
				</Route>
			</Routes>
		</div>
	</main>;
};

export default Main;