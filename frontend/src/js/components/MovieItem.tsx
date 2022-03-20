import { getPathToAssets } from "js/utils/Utils";
import { useNavigate } from "react-router-dom";

const MovieItem = ({ img, title, description, alt = "movieCover", to }) => {
	const path = getPathToAssets();

	if (description.length > 300) {
		description = description.slice(0, 300);
		description += "...";
	}
	const nav = useNavigate();

	const onAbout = () => {
		nav(to);
	};

	return (
		<div className="MovieItem" onClick={onAbout}>
			<div
				className="img-container"
				data-description={description}
				style={{
					background: `url("${img}") no-repeat center / cover`,
				}}
			></div>
			<span className="title">{title}</span>
		</div>
	);
};

export default MovieItem;
