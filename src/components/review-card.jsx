import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as api from "../api"

export default function ReviewCard () {
    const [isLoading, setIsLoading] = useState(true);
    const [currReview, setCurrReview] = useState([]);
    const review_id = useParams().review_id.slice(1);

    useEffect(() => {
        setIsLoading(true);
        api.fetchReview(review_id).then((review) => {
            setCurrReview(review);
            setIsLoading(false);
        })
    }, [])

    function formatCategoryString(string) {
        const words = string.replace("-", " ").split(" ");
        const result = words.map((word) => {
            return word[0].toUpperCase() + word.slice(1)
        })
        return result.join(" ")
    }

    return (
        <div>
            {isLoading ? (<p>Loading...</p>) : (
               <div key={currReview.review_id} className="review-card">
                   <h2>{currReview.title}</h2>
                   <img className="review-img" src={currReview.review_img_url} alt={currReview.title}></img>
                   <p>Category: {formatCategoryString(currReview.category)}</p>
                   <p>Designer: {currReview.designer}</p>
                   <p>Owner: {currReview.owner}</p>
                   <p>Created at: {(currReview.created_at).slice(0, -14)}</p>
                   <p>{currReview.review_body}</p>
                   <p>Votes: {currReview.votes}</p>
                   <div className="vote-box">
                   <button className="vote-button">👍</button>
                   <button className="vote-button">👎</button>
                   </div>
               </div>
        )}
        </div>
    )
}