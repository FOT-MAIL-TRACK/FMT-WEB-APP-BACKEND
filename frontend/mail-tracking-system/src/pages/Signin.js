import React, {useState} from 'react';
import logo from '../assets/fotmailtrack.jpeg';
import './Signin.css'
import NavBar from '../components/NavBar';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Signin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSignin = async(e) => {
    e.preventDefault();
    try{
      
      const response = await axios.post("http://localhost:5001/api/users/signin", {email, password})
      const userRegistrationNumber = response.data.user.registrationNumber;
      console.log("Response Data:", response.data); 
      if(  response.status === 200){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('registrationNumber', userRegistrationNumber);
        navigate('/home');
      }
      else{
        setError(response.data.message)
      }
    }
    catch (err){
      setError('Login failed')
    }
  }
  


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
        <form onSubmit={handleSignin}>

          <label><h1 className='h1-class' >Email</h1></label>
          <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your campus email" required/>
        
          <label><h1 className='h1-class'>Password</h1></label>
          <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password" required/>
          
          {error && <p>{error}</p>}
          <div className='signin-btn'>
          
          <button type="submit">Sign In</button>
          
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