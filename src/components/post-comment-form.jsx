import { useContext, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import * as api from "../api";

export default function PostCommentForm({ review_id }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [commentToAdd, setCommentToAdd] = useState({ username: currentUser });
  const [postedComment, setPostedComment] = useState({});
  const [err, setErr] = useState(null);
  const [isPosted, setIsPosted] = useState(false);

  function handleChange(body, value) {
    setCommentToAdd((currComment) => {
      return { ...currComment, [body]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (commentToAdd.body !== undefined) {
      setPostedComment(commentToAdd);
      setIsPosted(true);
      setErr(null);
      e.target.reset();
      api.addComment(review_id, commentToAdd).catch((err) => {
        setErr("Something went wrong, please try again");
      });
    }
  }

  return (
    <>
      <form className="post-comment-form" onSubmit={handleSubmit}>
        <label htmlFor="body">Add a comment: </label>
        <textarea
          className="post-comment-input"
          name="body"
          onChange={(e) => {
            handleChange("body", e.target.value);
          }}
        ></textarea>
        <input className="comment-button" type="submit" value="Post"></input>
      </form>
      {isPosted ? (
        <section className="newly-posted-comment">
          <p>Comment successfully posted!</p>
          <p>
            {postedComment.username}: {postedComment.body}
          </p>
          <p>Votes: 0 </p>
          <p>&lt;1 minute ago</p>
        </section>
      ) : (
        <p>{err}</p>
      )}
    </>
  );
}
