import {Link} from "react-router-dom"


export default function Navbar () {
    return (
        <div className="navbar">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/categories" className="navbar-link">Categories</Link>
        <Link to="/my_profile" className="navbar-link">My Profile</Link>
        </div>
    )
}