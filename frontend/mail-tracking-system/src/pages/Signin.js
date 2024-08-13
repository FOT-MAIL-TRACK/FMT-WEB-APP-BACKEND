import React from 'react';
import logo from '../assets/fotmailtrack.jpeg';
import './Signin.css'

const Signin = () => {
    return(
    <div className="signin-container">
        <div className="left-conatiner">
            <h1>
                <img src={logo} alt = "logo" />
                <p>
                The Faculty of Technology Mail Tracking System aims to streamline and enhance the process of managing and tracking physical mail within the faculty of technology, University of Sri Jayewardenepura.
                </p>    
            </h1> 
        </div>
        <div className="right-container">
            <h2>Signin</h2>
            <p>Please enter your account details to sign in to the system.</p>
            <form>
                <label>Email</label>
                <input type= "email" placeholder="Enter your campus email" required />

                <label>Password</label>
                <input type = "password" placeholder="Enter your password" required />

                <button type = "submit" >Sign in</button>
            </form> 
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    </div>
    )
}

export default Signin;