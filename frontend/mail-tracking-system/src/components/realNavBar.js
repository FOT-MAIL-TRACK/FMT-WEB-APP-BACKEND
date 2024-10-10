import React from 'react';
import {Link} from 'react-router-dom';
import './realNavBar.css';
import fotmailtracklogo from '../assets/fotmailtrack.jpeg';

const RealNavBar= () => {
    return(
        <nav className='realNavBar'>
                <img src={fotmailtracklogo} alt="mailogo" className='logo'/>
                <div className='nav-links'>
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/letters">Letters</Link>
                    <Link to="/track-logs">Track logs</Link>
                    <Link to="/profile-page">Profile Page</Link>
                    <Link to="/signin">Signout</Link>
                </div>
        </nav>
    )
}

export default RealNavBar;