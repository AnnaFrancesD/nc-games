import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useParams().category;

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

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        reviews.map((review) => {
          return (
            <div key={review.review_id} className="preview-review-card">
              <p>
                <b>{review.title}</b>
              </p>
              <img
                src={review.review_img_url}
                alt={review.title}
                width="100"
              ></img>
              <p>{review.review_body.slice(0, 71)}...</p>
              <button
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
