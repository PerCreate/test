import { getPathToAssets } from "js/utils/Utils";

const GenresItem = ({ img, title, type = "", alt = "movieCover" }) => {
	const path = getPathToAssets();

	return (
		<div className={`GenresItem ${"_" + type}`}>
			<div
				className="img-container"
				style={{
					background: `url("${path}/${img}") no-repeat center`,
				}}
			></div>
			<span className="title">{title}</span>
		</div>
	);
};

export default GenresItem;
