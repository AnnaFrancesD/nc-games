import { useState, useContext } from "react";
import * as api from "../api";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function CommentCard({ comment }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  function removeComment() {
    setIsDeleted(true);
    api.deleteComment(comment.comment_id);
  }

  return (
    <>
      {!isDeleted && (
        <section className="comment-card">
          <p>
            {comment.author}: {comment.body}
          </p>
          <p>Votes: {comment.votes}</p>
          <p>
            on {comment.created_at.slice(0, -14)} at{" "}
            {comment.created_at.slice(-13, -8)}
          </p>
          {currentUser === comment.author && (
            <button className="delete-comment-button" onClick={removeComment}>
              Delete Comment
            </button>
          )}
        </section>
      )}
    </>
  );
}
