import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import { formatCategoryString } from "./review-card";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api.fetchAllCategories().then((categories) => {
      setAllCategories(categories);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="category-list">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        allCategories.map((category) => {
          return (
            <div key={category.slug + "card"} className="category-card">
              <h3>
                <b key={category.slug}>{formatCategoryString(category.slug)}</b>
              </h3>
              <p key={category.description}>{category.description}</p>
              <Link
                to={`/categories/${category.slug}`}
                className="category-link"
              >
                Select
              </Link>
            </div>
          );
        })
      )}
    </section>
  );
}
