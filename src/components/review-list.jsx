import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api";
import { formatCategoryString } from "./review-card";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useParams().category;
  const [sortByQuery, setSortByQuery] = useState(null);
  const [orderQuery, setOrderQuery] = useState("desc");
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .fetchReviews(selectedCategory, sortByQuery, orderQuery)
      .then((reviews) => {
        setReviews(reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [selectedCategory, sortByQuery, orderQuery]);

  let navigate = useNavigate();
  function viewReview(review_id) {
    setIsLoading(true);
    navigate(`/reviews/${review_id}`);
  }

  function handleChange(value) {
    setSortByQuery(value);
  }

  function flipOrder(value) {
    setOrderQuery(value);
  }

  if (err)
    return (
      <>
        <p>{err}</p>
        <p>Sorry, that page doesn't exist!</p>
      </>
    );

  return (
    <section className="review-list">
      <div className="dropdown">
        <label htmlFor="sortby">Sort by</label>
        <select
          name="sortby"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          <option value="created_at">Date Added</option>
          <option value="votes">Votes</option>
          <option value="title">Title</option>
        </select>
        <button
          onClick={(e) => {
            flipOrder(e.target.value);
          }}
          value="asc"
          className="dropdown-button"
        >
          &#8593;
        </button>
        <button
          onClick={(e) => {
            flipOrder(e.target.value);
          }}
          value="desc"
          className="dropdown-button"
        >
          &#8595;
        </button>
      </div>

      {selectedCategory !== undefined && (
        <h2>{formatCategoryString(selectedCategory)}</h2>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        reviews.map((review) => {
          return (
            <div key={review.review_id} className="preview-review-card">
              <p>
                <strong>{review.title}</strong>
              </p>
              <img
                src={review.review_img_url}
                alt={review.title}
                width="100"
              ></img>
              <p>{review.review_body.slice(0, 71)}...</p>
              <button
                className="comment-button"
                onClick={() => {
                  viewReview(review.review_id);
                }}
                type="button"
              >
                Read 👀
              </button>
            </div>
          );
        })
      )}
    </section>
  );
}
