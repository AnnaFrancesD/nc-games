import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import * as api from "../api"

export default function Categories () {
const [isLoading, setIsLoading] = useState(true)
const [allCategories, setAllCategories] = useState([])


useEffect(() => {
    setIsLoading(true);
    api.fetchAllCategories().then((categories) => {
        setAllCategories(categories)
        setIsLoading(false);
    })
}, [])


    return (
        <div>
        { allCategories.map((category) => {
                return <div key={category.slug+"card"}className="category_card"><p><b key={category.slug}>{category.slug}</b></p>
                            <p key={category.description}>{category.description}</p>
                            <Link to={`/categories/${category.slug}`}
                             className="navbar_link">Select</Link>
                            </div>
            })}

            
        </div>
    )
}