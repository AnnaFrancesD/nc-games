import axios from "axios";

const api = axios.create({
  baseURL: "https://anna-nc-games-app.herokuapp.com/api",
});

export const fetchAllReviews = () => {
  return api.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};
