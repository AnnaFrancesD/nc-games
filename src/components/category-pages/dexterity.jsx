import * as api from "/Users/annadehl/Northcoders/frontend/nc-games/src/api"
import { useEffect, useState } from "react"

export default function Dexterity() {
    const [isLoading, setIsLoading] = useState(true)
    const [filteredReviews, setFilteredReviews] = useState([])

    const filterByCategory = (reviews, category) => {
        return reviews.filter((review) => {
            return review.category === category
        })
    }


    useEffect(() => {
        setIsLoading(true);
        api.fetchAllReviews().then((reviews) => {
            setFilteredReviews(filterByCategory(reviews, "dexterity"))
            setIsLoading(false);
        })
    }, [])

    return (
        <>
        {isLoading ? (<p>Loading...</p>) : (
            filteredReviews.map((review) => {
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