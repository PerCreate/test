import GenresItem from "./GenresItem";

const GenreItemsList = ({ genres }) => {
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
