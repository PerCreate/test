import { getPathToAssets } from "js/utils/Utils";

const MovieItem = ({ img, title, description, alt = "movieCover" }) => {
	const path = getPathToAssets();

	if (description.length > 300) {
		description = description.slice(0, 300);
		description += "...";
	}

	return (
		<div className="MovieItem">
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
