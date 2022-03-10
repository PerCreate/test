import { useEffect, useState } from "react";

const BookEvent = (props) => {
	const [isShow, setIsShow] = useState(false);
	const { emitter } = props;

	useEffect(() => {
		emitter.listen('openWindow', () => setIsShow(prev => !prev));
	}, [emitter]);

	if (!isShow) return '';

	return <div className="Window">
		<div className="Window-overlay" onClick={() => setIsShow(prev => !prev)}></div>
		<div className="Window-block">
			<div className="Window-close" onClick={() => setIsShow(prev => !prev)}>Close</div>
			<div className="Window-title">Записаться на мероприятие</div>
			<div className="Window-block-person-data">
				<div className="data full-name">
					<input className="data" placeholder="ФИО" type="text" />
				</div>
				<div className="data number">
					<input className="data" placeholder="Телефон" type="number" />
				</div>
				<div className="data email">
					<input className="data" placeholder="Email" type="email" />
				</div>
				<div className="data submit">
					<button className="data d-fl al-c js-c" type="button" onClick={event => {
						event.preventDefault();
						setIsShow(prev => !prev);
					}
					} >Записаться</button>
				</div>
			</div>
		</div>

	</div>;
};

export default BookEvent;