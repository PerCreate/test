import { Link, NavLink } from "react-router-dom";

const Chapter = (props) => {

	return <NavLink
		className={`Chapter`}
		type={props.type}
		to={props.to}
	>
		{props.text}
	</NavLink>;
};

export default Chapter;