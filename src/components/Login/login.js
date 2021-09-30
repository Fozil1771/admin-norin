import React from 'react'
import { Link } from 'react-router-dom'

function LoginForm() {
    return (
        <div className="loginFrom">
            <div className="form">
                <form className="register_form">
                    <div className="mb-32">
                        <h3 className="mb-16 text-white">Registration Form</h3>
                        <div className="inputField mb-16">
                            <input className="input" type="text" placeholder="name" />
                        </div>
                        <div className="inputField mb-16">
                            <input className="input" type="password" placeholder="password" />
                        </div>
                    </div>
                    <div className="w-100">
                        <Link to="/dashboard" className="btn btn__blue w-100">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
