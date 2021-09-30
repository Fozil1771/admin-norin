import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <div>
                <h2 className="text-white">Admin Norin</h2>
            </div>
            <div>
                <Link to="/login" className="btn btn__blue w-100">Back</Link>
            </div>
        </nav>
    )
}

export default Navbar
