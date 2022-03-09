import { useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/httpHook";

const BathEvents = () => {
	const { sendRequest } = useHttpClient();
	const [eventData, setEventData] = useState();

	useEffect(() => {
		async function getEvents() {
			const data = await sendRequest('http://app-chistopar.dev-2-tech.ru:8080/api/journal/455');
			setEventData([data]);
			console.log(data);
		}
		getEvents();
	}, [sendRequest]);

	return <div className="col">
		<h2>Мероприятия</h2>
		{
			eventData && eventData.map(event => {
				return <div key={event.id} className="event"></div>;
			})
		}
	</div>;
};

export default BathEvents;