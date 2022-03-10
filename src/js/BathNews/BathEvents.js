import { useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/httpHook";

import '../../css/BathNews/BathEvents.scss';

const BathEvents = (props) => {
	const { sendRequest } = useHttpClient();
	const [eventData, setEventData] = useState([]);
	const { emitter } = props;

	useEffect(() => {
		async function getEvents() {
			const data = await sendRequest('http://app-chistopar.dev-2-tech.ru:8080/api/journal/455');
			setEventData([data]);
		}
		getEvents();
	}, [sendRequest]);

	// working Добавить удаление из фаворитов.(Если уже в фаворите - удаляем, иначе добавляем)
	return <div className="Events col">
		<h2 className="mb-9r _fill">Мероприятия</h2>
		<div className="Events-container">
			{
				eventData.map(event => {
					return <div key={event.id} className="event" onClick={() => emitter.dispatch('openWindow')}>
						<div className="event-favorite" onClick={event => {
							event.stopPropagation();
							emitter.dispatch('addFavorite');
						}}></div>
						<div className="event-header mb-1r">МЕРОПРИЯТИЯ</div>
						<div className="event-title">{event.title}</div>
						<div className="event-map-point d-fl">{event.point || 'Москва'}</div>
						<div className="event-bottom-container">
							<div className="left-side d-fl">
								<div className="event-date d-fl">{event.date || '12 сентября 2021'}</div>
							</div>
							<div className="right-side d-fl">
								<div className="event-saved d-fl al-c">{event.saved || 0}</div>
								<div className="event-views d-fl al-c">{event.views || 0}</div>
							</div>
						</div>
					</div>;
				})
			}

		</div>
	</div>;
};

export default BathEvents;