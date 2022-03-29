import { getPathToAssets } from "js/utils/Utils";
import { useNavigate } from "react-router-dom";

interface MovieItemProps {
	img: string;
	title: string;
	description: string;
	alt?: string;
	to: string;
}

const MovieItem = ({ img, title, description, alt = "movieCover", to }: MovieItemProps) => {
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
		<div className="MovieItem">
			<div
				className="img-container"
				data-description={description}
				style={{
					background: `url("${img}") no-repeat center / cover`,
				}}
				onClick={onAbout}
			>
				<div className="wrapper"></div>
			</div>
			<span className="title">{title}</span>
		</div>
	);
};

export default MovieItem;
