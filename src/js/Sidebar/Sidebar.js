import { Route, Routes } from 'react-router-dom';
import '../../css/Sidebar.scss';
import BathEvents from '../BathNews/BathEvents';
import Chapter from "./Chapter";

const chaptersOptions = {
	main: "Главная",
	news: "Вести",
	articles: "Статьи",
	overviews: "Обзоры",
	events: "Мероприятия",
};

const Sidebar = (props) => {
	const { emitter, setIsShow } = props;

	return <>
		<div className="col-3">
			<ul className="Sidebar">
				{
					Object.keys(chaptersOptions).map((option, index) => (
						<Chapter
							key={option + index}
							text={chaptersOptions[option]}
							type={option}
							to={option}
						/>
					))
				}
			</ul>
		</div>
		<Routes>
			<Route path="events" element={<BathEvents setIsShow={() => setIsShow(prev => !prev)} emitter={emitter} />} />
		</Routes>
	</>;
};

export default Sidebar;
