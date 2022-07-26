import axios from "axios";

const api = axios.create({
  baseURL: `https://anna-nc-games-app.herokuapp.com/api`,
});

export const fetchAllReviews = () => {
  return api.get(`/reviews`).then(({ data }) => {
    return data.reviews;
  });
};

export const fetchReviewsByCategory = (category) => {
  return api.get(`/reviews/?category=${category}`).then(({ data }) => {
    console.log(data);
    return data.reviews;
  });
};

export const fetchAllCategories = () => {
  return api.get(`/categories`).then(({ data }) => {
    return data.categories;
  });
};

export const fetchReview = (review_id) => {
  return api.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const voteOnComment = (review_id, votes) => {
  return api.patch(`/reviews/${review_id}`, votes);
};
