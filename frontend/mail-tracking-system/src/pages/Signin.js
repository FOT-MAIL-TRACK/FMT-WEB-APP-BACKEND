import React from 'react';
import logo from '../assets/fotmailtrack.jpeg';
import './Signin.css'
import NavBar from '../components/NavBar';
import {Link} from 'react-router-dom';

const Signin = () => {
  return (
    <>

    <NavBar/>
    <div className="signin-container">
     
      <div className="left-section">
        <h1>
        <div className="logo-fmt">
            <img src={logo} alt="logo" />
        </div>
        </h1>
        <div className="desc" >
        <p>The Faculty of Technology Mail Tracking System aims to streamline and enhance the process of managing and tracking physical mail within the faculty of technology, University of Sri Jayawardenepura.</p>
        </div>
      </div>
      <div className="right-section">
        <h1 className='h1-class'>Sign In</h1>
        <p className='p-class'>Please Enter your account details to sign in to the system. </p>
        <form>
          <label><h1 className='h1-class' >Email</h1></label>
          <input type="email" placeholder="Enter your campus email" />
        
          <label><h1 className='h1-class'>Password</h1></label>
          <input type="password" placeholder="Enter your password" />
          
          <div className='signin-btn'>
          <Link to="/home">
          <button type="submit">Sign In</button>
          </Link>
          </div>
          
        </form>
        <div className="center-text">
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signin;