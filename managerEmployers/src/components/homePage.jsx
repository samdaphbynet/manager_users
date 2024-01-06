import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {


    return (
        <div className="home">
            <div className="button">
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn" to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}