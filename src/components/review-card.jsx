import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as api from "../api"

export default function ReviewCard () {
    const [isLoading, setIsLoading] = useState(true);
    const [currReview, setCurrReview] = useState([]);
    const [err, setErr] = useState(null);
    const [votes, setVotes] = useState([]);
    const review_id = useParams().review_id;

    useEffect(() => {
        setIsLoading(true);
        api.fetchReview(review_id).then((review) => {
            setCurrReview(review);
            setVotes(review.votes)
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

    function upvote(review_id) {
        setVotes((currVotes) => currVotes + 1);
        setErr(null);
        api.voteOnComment(review_id, {inc_votes: 1}).catch((err) => {
            setVotes((currVotes) => currVotes - 1);
            setErr("Something went wrong, please try again");
        });
    }

    function downvote(review_id) {
        setVotes((currVotes) => currVotes - 1);
        setErr(null);
        api.voteOnComment(review_id, {inc_votes: -1}).catch((err) => {
            setVotes((currVotes) => currVotes + 1);
            setErr("Something went wrong, please try again");
        });
        
    }


    if (err) return <p>{err}</p>
    return (
        <>
            {isLoading ? (<p>Loading...</p>) : (
               <div key={currReview.review_id} className="review-card">
                   <h2>{currReview.title}</h2>
                   <img className="review-img" src={currReview.review_img_url} alt={currReview.title}></img>
                   <p>Category: {formatCategoryString(currReview.category)}</p>
                   <p>Designer: {currReview.designer}</p>
                   <p>Owner: {currReview.owner}</p>
                   <p>Created at: {(currReview.created_at).slice(0, -14)}</p>
                   <p>{currReview.review_body}</p>
                   <p>Votes: {votes}</p>
                   <div className="vote-box">
                   <button onClick={() => {upvote(currReview.review_id)}} className="vote-button">👍</button>
                   <button onClick={() => {downvote(currReview.review_id)}} className="vote-button">👎</button>
                   </div>
               </div>
        )}
        </>
    )
}