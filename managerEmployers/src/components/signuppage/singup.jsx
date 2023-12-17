import './signup.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        const formData = {
            name: event.target.elements.name.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value
        };

        await axios.post("https://https://manager-users-server.vercel.app/signup", formData)
            .then(res => {
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className='login-page'>
                <form action="" className='form' onSubmit={handleSubmit}>
                    <h1>Sign-Up Page</h1>
                    <div className="name">
                        <label htmlFor="name">Name:</label>
                        <input name='name' type="text" placeholder='Enter Name' required/>
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email:</label>
                        <input name='email' type="text" placeholder='Enter Email' required/>
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" placeholder='Enter Password' required/>
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