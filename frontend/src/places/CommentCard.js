import { useContext } from "react";
import { CurrentUser } from '../contexts/CurrentUser';

function CommentCard({ comment, onDelete }) {
    const { currentUser } = useContext(CurrentUser);
    const { author, rant, content, stars } = comment; // Destructure comment properties

    const deleteButton = currentUser?.userId === comment.authorId && (
        <button className="btn btn-danger" onClick={onDelete}>
            Delete Comment
        </button>
    );

    return (
        <div className="border col-sm-4">
            <h2 className="rant">{rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
            <h4>{content}</h4>
            {author ? (
                <h3>
                    <strong>- {author.firstName} {author.lastName}</strong>
                </h3>
            ) : (
                <h3><strong>- Anonymous</strong></h3>
            )}
            <h4>Rating: {stars}</h4>
            {deleteButton}
        </div>
    );
}

export default CommentCard;
