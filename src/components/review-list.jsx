import { useState, useEffect } from "react"
import * as api from "../api"

export default function ReviewList () {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        api.fetchAllReviews().then((reviews) => {
            setReviews(reviews);
            setIsLoading(false);
        })
    }, [])

    return (
        <>
        {isLoading ? (<p>Loading...</p>) : (
            reviews.map((review) => {
               return <div key={review.review_id} className="preview_review_card">
                   <p><b>{review.title}</b></p>
                   <img src={review.review_img_url} alt={review.title} width="100"></img>
                   <p>{review.review_body.slice(0, 71)}...</p>
               </div>
            })
        )}
        </>
    )
}