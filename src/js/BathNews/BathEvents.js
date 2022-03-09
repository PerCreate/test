import { useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/httpHook";

const BathEvents = () => {
	const { sendRequest } = useHttpClient();
	const [eventData, setEventData] = useState([]);

	useEffect(() => {
		async function getEvents() {
			const data = await sendRequest('http://app-chistopar.dev-2-tech.ru:8080/api/journal/455');
			setEventData([data]);
			console.log(data);
		}
		getEvents();
	}, [sendRequest]);

	return <div className="Events col">
		<h2 className="mb-9r">Мероприятия</h2>
		{
			eventData.map(event => {
				return <div key={event.id} className="event">
					<div className="event-favorite"></div>
					<div className="event-header">МЕРОПРИЯТИЯ</div>
					<div className="event-title">{event.title}</div>
					<div className="event-map-point">{event.point || 'Москва'}</div>
					<div className="event-date">{event.date || '12 сентября 2021'}</div>
					<div className="event-saved">{event.saved || 0}</div>
					<div className="event-views">{event.views || 0}</div>
				</div>;
			})
		}
	</div>;
};

export default BathEvents;