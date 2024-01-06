import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {


    return (
        <div className='home'>
            <div className='button'>
                <Link to="/login" className='btn'>Sign-In</Link>
                <Link to="/signup" className='btn'>Sign-Up</Link>
            </div>
        </div>
    )
}