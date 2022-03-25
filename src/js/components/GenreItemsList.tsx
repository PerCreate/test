import { Genre } from "js/page/Main";
import GenresItem from "./GenresItem";

interface GenreItemsListProps {
	genres: Genre[];
}

const GenreItemsList = ({ genres }: GenreItemsListProps) => {
	return (
		<div className="GenreItemsList">
			{genres.map((genre: any, index: number) => (
				<GenresItem
					key={genre.type + index}
					type={genre.type}
					title={genre.title}
					img={genre.img}
				/>
			))}
		</div>
	);
};

export default GenreItemsList;
