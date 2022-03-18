const MovieItem = ({ url, title, description, alt = "movieCover" }) => {
	return (
		<div className="MovieItem">
			<div className="img-container" data-description={description}>
				<img
					src={require("/assets/movieItems/batman.svg").default}
					alt={alt}
				/>
			</div>
			<span className="title">{title}</span>
		</div>
	);
};

export default MovieItem;
