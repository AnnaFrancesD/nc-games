import axios from "axios";

const api = axios.create({
  baseURL: `https://anna-nc-games-app.herokuapp.com/api`,
});

export const fetchReviews = (category) => {
  return api
    .get(`/reviews`, {
      params: {
        category: category,
      },
    })
    .then(({ data }) => {
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

export const fetchComments = (review_id) => {
  return api.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
