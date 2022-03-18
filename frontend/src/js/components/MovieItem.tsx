import { getPublicPath } from "js/utils/Utils";
import { useLocation, useParams } from "react-router-dom";

const MovieItem = ({ img, title, description, alt = "movieCover" }) => {
	const path = "/assets/movieItems/";

	return (
		<div className="MovieItem">
			<div
				className="img-container"
				data-description={description}
				style={{
					backgroundImage: `url("${path}/${img}")`,
				}}
			></div>
			<span className="title">{title}</span>
		</div>
	);
};

export default MovieItem;
