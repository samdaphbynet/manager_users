import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";


export const Login = () => {

	const [values, setValues] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate();


	const handleInput = (event) => {
		setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
	}

	const handleSubmit = (event) => {
        event.preventDefault();

			axios.post("https://manager-users-server.vercel.app/login", values)
				.then(res => {
					if (res.data === "Success") {
					    navigate('/dashbord')
				    }else {
					    return (
                            document.querySelector(".test").innerHTML = "Email or Password incorrect"
                        )
				    }  
				})
            .catch (err => console.log(err)); 
    }

    return(
        <div className="container">
            <div className='login-page'>
                <form action="" className='form' onSubmit={handleSubmit}>
                    <h1>Login Page</h1>
                    <p className="test"></p>
                    <div className="email">
                        <label htmlFor="email">Email:</label>
                        <input name='email' type="text" placeholder='Enter Email' onChange={handleInput}/>
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" placeholder='Enter Password' onChange={handleInput}/>
                    </div>

                    <button className='btn' type='submit'>Log In</button>

                    <div className="checkbox">
                        <input type="checkbox"/>
                        <label htmlFor="">You are Agree with terms & Conditions</label>
                    </div>

                </form>
            </div>
        </div>
    )
}