import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
import CommentCard from "./comment-card";
import PostCommentForm from "./post-comment-form";

export function formatCategoryString(string) {
  const words = string.replace(/(-)/g, " ").split(" ");
  const result = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return result.join(" ");
}

export default function ReviewCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [currReview, setCurrReview] = useState([]);
  const [isViewingComments, setIsViewingComments] = useState(false);
  const [currComments, setCurrComments] = useState([]);
  const [hasComments, setHasComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [err, setErr] = useState(null);
  const [votes, setVotes] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const review_id = useParams().review_id;

  useEffect(() => {
    setIsLoading(true);
    api.fetchReview(review_id).then((review) => {
      setCurrReview(review);
      setVotes(review.votes);
      setIsLoading(false);
    });
  }, []);

  function upvote(review_id) {
    setVotes((currVotes) => currVotes + 1);
    setHasVoted(true);
    setErr(null);
    api.voteOnComment(review_id, { inc_votes: 1 }).catch((err) => {
      setVotes((currVotes) => currVotes - 1);
      setErr("Something went wrong, please try again");
    });
  }

  function downvote(review_id) {
    setVotes((currVotes) => currVotes - 1);
    setHasVoted(true);
    setErr(null);
    api.voteOnComment(review_id, { inc_votes: -1 }).catch((err) => {
      setVotes((currVotes) => currVotes + 1);
      setErr("Something went wrong, please try again");
    });
  }

  function viewComments(review_id) {
    api
      .fetchComments(review_id)
      .then((comments) => {
        setCurrComments(comments);
        setHasComments(true);
      })
      .catch((err) => {
        setHasComments(false);
      });
    setIsViewingComments(true);
  }

  if (err) return <p>{err}</p>;
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section key={currReview.review_id} className="review-card">
          <h2>{currReview.title}</h2>
          <img
            className="review-img"
            src={currReview.review_img_url}
            alt={currReview.title}
          ></img>
          <p>Category: {formatCategoryString(currReview.category)}</p>
          <p>Designer: {currReview.designer}</p>
          <p>Owner: {currReview.owner}</p>
          <p>
            Created: {currReview.created_at.slice(0, -14)} at{" "}
            {currReview.created_at.slice(-13, -8)}
          </p>
          <p>{currReview.review_body}</p>
          <p>Votes: {votes}</p>

          <div className="vote-box">
            <button
              disabled={hasVoted ? true : false}
              onClick={() => {
                upvote(currReview.review_id);
              }}
              className="vote-button"
            >
              👍
            </button>
            <button
              disabled={hasVoted ? true : false}
              onClick={() => {
                downvote(currReview.review_id);
              }}
              className="vote-button"
            >
              👎
            </button>
          </div>

          <div className="comment-box">
            <button
              onClick={() => viewComments(currReview.review_id)}
              className="comment-button"
            >
              View Comments
            </button>
            <button
              onClick={() => setIsCommenting(true)}
              className="comment-button"
            >
              Post Comment
            </button>
          </div>
        </section>
      )}
      <section className="comment-list">
        {isCommenting && (
          <PostCommentForm
            currComments={currComments}
            setCurrComments={setCurrComments}
            review_id={currReview.review_id}
          />
        )}
        {isViewingComments && hasComments
          ? currComments.map((comment) => {
              return <CommentCard comment={comment} key={comment.comment_id} />;
            })
          : isViewingComments && (
              <p>There are no comments for this review at the moment.</p>
            )}
      </section>
    </>
  );
}
