import axios from "axios";
import Loader from "js/components/Loader";
import SignInWindow from "js/components/SignInWindow";
import { setNewComments } from "js/redux/actions";
import { rootReducerState } from "js/redux/rootReducer";
import Button from "js/UI/Button";
import { deepCopy, getAPI, getBaseURL, getRandomId } from "js/utils/Utils";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "./Main";

export type comment = {
	id: number;
	userID: string;
	movieId: number;
	userName: string;
	text: string;
};

interface AboutProps {
	children?: any;
	userToken: string;
	userName: string;
	stateComments: rootReducerState["comments"];
	dispatchNewComments: typeof setNewComments;
}

const mapState = (state: rootReducerState) => {
	return {
		userToken: state.user_token,
		userName: state.userName || "",
		stateComments: state.comments,
	};
};

const mapDispatch = {
	dispatchNewComments: setNewComments,
};

const About = ({
	children,
	userToken,
	userName,
	dispatchNewComments,
	stateComments,
}: AboutProps) => {
	const [isLoading, setLoading] = useState(true);
	const [newCommentValue, setNewCommentValue] = useState("");
	const [comments, setComments] = useState<comment[]>([]);
	const [movie, setMovie] = useState<Movie>();
	const [movieId, setMovieId] = useState<number>(0);
	const [isSignInWindowOpen, onOpenSignInWindow] = useState(false);
	const nav = useNavigate();

	const params = useParams();
	const path = getBaseURL();

	useEffect(() => {
		const getData = async () => {
			try {
				if (params?.id) {
					const currentMovieId = +params.id as number;

					var dataMovie = await axios.get(getAPI(`movie/${currentMovieId}`, ""));
					var { backdrop_path, genres, id, title, overview, release_date } =
						dataMovie.data;
					setMovie({
						backdrop_path,
						genres,
						id,
						title,
						overview,
						release_date,
					});
					if (stateComments && stateComments[currentMovieId]) {
						setComments(
							stateComments[currentMovieId].filter(
								(comment: comment) => comment.movieId === currentMovieId
							)
						);
					}
					setLoading(false);
				}
			} catch (e) {
				console.log(e);
			}
		};
		if (params?.id) {
			setMovieId(+params.id);
			getData();
		} else {
			throw new Error(`params is missing id parameter`);
		}
	}, []);

	if (isLoading) {
		return (
			<div className="About">
				<Loader />
			</div>
		);
	}
	//working Возвращать Error компоненту
	if (!movie) {
		return (
			<div className="About">
				<Loader />
			</div>
		);
	}

	const updateComments = (comments: comment[]) => {
		dispatchNewComments({ newComments: comments, movieId: movieId });
	};

	const onDeleteComment = (id: number) => {
		const newComments: comment[] = comments.filter((comment: comment) => comment.id !== id);
		setComments(newComments);
		updateComments(newComments);
	};

	const onPublishComment = () => {
		if (!newCommentValue.length) {
			return;
		}
		const newComments: comment[] = deepCopy(comments);
		const newComment: comment = {
			id: getRandomId(),
			userID: userToken,
			userName: userName || "Аноним",
			text: newCommentValue,
			movieId: movieId,
		};
		newComments.unshift(newComment);
		setNewCommentValue("");
		setComments(newComments);
		updateComments(newComments);
	};

	const onBackLink = () => {
		nav("/main");
	};

	return (
		<div className="About">
			<SignInWindow isOpen={isSignInWindowOpen} onClose={onOpenSignInWindow} />
			<div className="arrow-back" onClick={onBackLink}></div>
			<div className="About-info">
				<div
					className="img-container"
					style={{
						background: `url("${
							path + "/w342" + movie.backdrop_path
						}") no-repeat center / cover`,
					}}
				></div>
				<div className="info-container">
					<div className="charts">
						<div className="chart">
							<div className="title">Название:</div>
							<div className="value"> {movie.title}</div>
						</div>
						<div className="chart release">
							<div className="title">Дата выхода: </div>
							<div className="value">{movie.release_date} </div>
						</div>
						<div className="chart genre">
							<div className="title">Жанры: </div>
							<div className="value">
								{movie.genres?.map((genre) => genre.name).join(", ") ||
									"Нет информации"}
							</div>
						</div>
					</div>

					<div className="overview _mt24">{movie.overview}</div>
				</div>
			</div>
			<div className="About-comments">
				<div className="headline">Комментарии</div>
				<div className="comments-container">
					<div className="comments-list">
						{" "}
						<textarea
							className="comment-new"
							placeholder="Введите комментарий"
							value={newCommentValue}
							onChange={(e) => setNewCommentValue(e.target.value)}
						/>
						{comments.map((comment: comment) => {
							return (
								<div className="comment" key={comment.id}>
									<div className="comment-userName">{comment.userName}</div>
									<div className="comment-text">{comment.text}</div>
									{userToken === comment.userID && (
										<div
											className="comment-delete"
											onClick={() => onDeleteComment(comment.id)}
										></div>
									)}
								</div>
							);
						})}
					</div>
					<div className="button-container">
						<Button
							classes="_ml15"
							disabled={!userToken}
							name="Опубликовать"
							callback={onPublishComment}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(mapState, mapDispatch)(About);
