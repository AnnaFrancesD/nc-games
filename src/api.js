import axios from "axios";

const api = axios.create({
  baseURL: "https://anna-nc-games-app.herokuapp.com/api",
});

export const fetchAllReviews = () => {
  return api.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};

export const fetchAllCategories = () => {
  return api.get("/categories").then(({ data }) => {
    return data.categories;
  });
};
