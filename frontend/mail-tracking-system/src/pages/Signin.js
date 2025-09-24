import React, { useState } from 'react';
import logo from '../assets/fotmailtrack.jpeg';
import './Signin.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/users/signin", { email, password });
      const userRegistrationNumber = response.data.user.registrationNumber;
      console.log("Response Data:", response.data);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('registrationNumber', userRegistrationNumber);

        localStorage.setItem('userRole', response.data.user.role);
        navigate('/home');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="signin-container">
        <div className="left-section">
          <img src={logo} alt="logo" className="logo" />
          <p className="desc">
            The Faculty of Technology Mail Tracking System streamlines the process of managing and tracking physical mail within the Faculty of Technology, University of Sri Jayewardenepura.
          </p>
        </div>
        <div className="right-section">
          <h2 className="title">Sign In</h2>
          <p className="subtitle">Enter your account details to access the system</p>
          <form onSubmit={handleSignin} className="signin-form">
            <label>Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your campus email"
                required
              />
            </label>

            <label>Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="signin-btn">Sign In</button>
          </form>
          <p className="signup-text">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
