import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
import { CurrentUser } from "../contexts/CurrentUser";
import CommentCard from './CommentCard';
import NewCommentForm from "./NewCommentForm";

function PlaceDetails() {
	const { placeId } = useParams();
	const history = useHistory();
	const { currentUser } = useContext(CurrentUser);
	const [place, setPlace] = useState(null);
	const [error, setError] = useState(null); // New state for error handling
	const [loading, setLoading] = useState(true); // New loading state

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_SERVER_URL}places/${placeId}`);
				if (!response.ok) throw new Error('Failed to fetch place data');
				const resData = await response.json();
				setPlace(resData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [placeId]);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error: {error}</h1>;
	if (!place) return <h1>Place not found</h1>;

	const { name, city, state, founded, cuisines, pic, comments } = place; // Destructured

	const editPlace = () => {
		history.push(`/places/${place.placeId}/edit`);
	};

	const deletePlace = async () => {
		await fetch(`${process.env.REACT_APP_SERVER_URL}places/${place.placeId}`, {
			method: 'DELETE'
		});
		history.push('/places');
	};

	const deleteComment = async (deletedComment) => {
		await fetch(`${process.env.REACT_APP_SERVER_URL}places/${place.placeId}/comments/${deletedComment.commentId}`, {
			method: 'DELETE'
		});

		setPlace((prev) => ({
			...prev,
			comments: prev.comments.filter(comment => comment.commentId !== deletedComment.commentId)
		}));
	};

	const createComment = async (commentAttributes) => {
		const response = await fetch(`${process.env.REACT_APP_SERVER_URL}places/${place.placeId}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(commentAttributes)
		});

		const comment = await response.json();

		setPlace((prev) => ({
			...prev,
			comments: [...prev.comments, comment]
		}));
	};

	const rating = comments.length ? (
		(() => {
			let sumRatings = comments.reduce((tot, c) => tot + c.stars, 0);
			let averageRating = Math.round(sumRatings / comments.length);
			return (
				<h3>{'⭐️'.repeat(averageRating)} stars</h3>
			);
		})()
	) : (
		<h3 className="inactive">Not yet rated</h3>
	);

	const commentsList = comments.length ? (
		comments.map(comment => (
			<CommentCard key={comment.commentId} comment={comment} onDelete={() => deleteComment(comment)} />
		))
	) : (
		<h3 className="inactive">No comments yet!</h3>
	);

	const placeActions = currentUser?.role === 'admin' ? (
		<>
			<a className="btn btn-warning" onClick={editPlace}>Edit</a>{` `}
			<button type="button" className="btn btn-danger" onClick={deletePlace}>Delete</button>
		</>
	) : null;

	return (
		<main>
			<div className="row">
				<div className="col-sm-6">
					<img style={{ maxWidth: 200 }} src={pic} alt={name} />
					<h3>Located in {city}, {state}</h3>
				</div>
				<div className="col-sm-6">
					<h1>{name}</h1>
					<h2>Rating</h2>
					{rating}
					<br />
					<h2>Description</h2>
					<h3>{name} has been serving {city}, {state} since {founded}.</h3>
					<h4>Serving {cuisines}.</h4>
					<br />
					{placeActions}
				</div>
			</div>
			<hr />
			<h2>Comments</h2>
			<div className="row">{commentsList}</div>
			<hr />
			<h2>Got Your Own Rant or Rave?</h2>
			<NewCommentForm place={place} onSubmit={createComment} />
		</main>
	);
}

export default PlaceDetails;
