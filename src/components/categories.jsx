import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import * as api from "../api"

export default function Categories () {
const [isLoading, setIsLoading] = useState(true)
const [allCategories, setAllCategories] = useState([])
const [category, setCategory] = useState([])


useEffect(() => {
    setIsLoading(true);
    api.fetchAllCategories().then((categories) => {
        setAllCategories(categories)
        setIsLoading(false);
    })
}, [])

let navigate = useNavigate()

    return (
        <div>
        { allCategories.map((category) => {
                return <div className="category_card"><p><b>{category.slug}</b></p>
                            <p>{category.description}</p>
                            <Link to={`/categories/${category.slug}`}
                             className="navbar_link">Select</Link>
                            </div>
            })}

            
        </div>
    )
}