import  {Link}  from "react-router-dom"

export const HomePage = () => {
    return (
        <div className="hompage">
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn" to="/signup">Sign Up</Link>
            <Link className="btn" to="/dashbord">Dashbord</Link>
        </div>
    )
}