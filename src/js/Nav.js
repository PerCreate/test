import { useEffect, useState } from 'react';
import '../css/Nav.scss';
import { useHttpClient } from './shared/hooks/httpHook';
import { Link, NavLink } from 'react-router-dom';

const Nav = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [baths, setBaths] = useState([]);
	const [favoriteCount, setFavoriteCount] = useState(0);

	useEffect(() => {
		async function loadBaths() {
			const data = await sendRequest('http://app-chistopar.dev-2-tech.ru:8080/api/bath');
			setBaths(data.data);
		}
		loadBaths();
	}, [sendRequest]);

	return <nav className="navbar navbar-expand-lg fixed-top navbar-light">
		<div className="container">
			<Link to="" className="navbar-brand"></Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-4">
					<li className="nav-item dropdown hamburger">
						<Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span className="hamburger"></span>
							<span className="text">КАТАЛОГ БАНЬ</span>
						</Link>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							{
								baths.map((bath, index) => {
									return <Link to="" className="dropdown-item" key={bath.name + index}>{bath.name}</Link>;
								})
							}
						</div>
					</li>
					<li className="nav-item">
						<Link to="/specialists" className="nav-link">СПЕЦИАЛИСТЫ</Link>
					</li>
					<li className="nav-item">
						<Link to="/bath-news/main" className="nav-link active">БАННЫЙ ВЕСТНИК</Link>
					</li>
					<li className="nav-item">
						<Link to="/about" className="nav-link">О ПРОЕКТЕ</Link>
					</li>
				</ul>

				<form className="form-inline my-2 my-lg-0 mr-4">
					<input className="form-control mr-sm-2" type="search" placeholder="Поиск по банным комплексам" aria-label="Search" />
				</form>

				<ul className="navbar-nav mr-auto">
					<li className="nav-item map-point mr-4">
						<Link to="" className="nav-link">Красная поляна</Link>
					</li>
					<li className="nav-item dropdown flag mr-1" value={favoriteCount > 99 ? '99+' : favoriteCount}>
						<Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span className="flag-icon"></span>
						</Link>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							{
								baths.map((bath, index) => {
									return <Link to="" className="dropdown-item" key={bath.name + index}>{bath.name}</Link>;
								})
							}
						</div>
					</li>
					<li className="nav-item person">
						<Link to="" className="nav-link"></Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>;
};

export default Nav;
