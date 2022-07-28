import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as api from "../api";
import { formatCategoryString } from "./review-card";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useParams().category;
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    api.fetchReviews(selectedCategory).then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, []);

  let navigate = useNavigate();
  function viewReview(review_id) {
    setIsLoading(true);
    navigate(`/reviews/${review_id}`);
  }

  function handleChange(value) {
    setIsLoading(true);
    navigate(`/reviews/?sort_by=${value}`);
  }

  return (
    <>
      <div className="dropdown">
        <label htmlFor="sortby">Sort by</label>
        <select
          name="sortby"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          <option value="created_at">Date Added</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button className="dropdown-button">&#8593;</button>
        <button className="dropdown-button">&#8595;</button>
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
    </>
  );
}
