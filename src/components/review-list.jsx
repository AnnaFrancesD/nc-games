import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as api from "../api"

export default function ReviewList () {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const selectedCategory = useParams()

    useEffect(() => {
        setIsLoading(true);
        const query = selectedCategory.category;
        if (query === undefined) {
        api.fetchAllReviews().then((reviews) => {
            setReviews(reviews);
            setIsLoading(false);
        })}
        api.fetchReviewsByCategory(query).then((reviews) => {
            setReviews(reviews);
            setIsLoading(false)
        })
    }, [])
    

    return (
        <>
        {isLoading ? (<p>Loading...</p>) : (
            reviews.map((review) => {
               return <div key={review.review_id} className="preview-review-card">
                   <p><b>{review.title}</b></p>
                   <img src={review.review_img_url} alt={review.title} width="100"></img>
                   <p>{review.review_body.slice(0, 71)}...</p>
                   <button type="button"><Link to={`/reviews/${review_id}`}>Read 👀</Link></button>
               </div>
            })
        )}
        </>
    )
}