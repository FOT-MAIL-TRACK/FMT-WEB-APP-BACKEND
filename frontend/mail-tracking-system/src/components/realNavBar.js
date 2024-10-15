import React from 'react';
import {Link} from 'react-router-dom';
import './realNavBar.css';
import fotmailtracklogo from '../assets/fotmailtrack.jpeg';
import SignOutDialog from './SignOutDialog';

const RealNavBar= () => {
    return(
        <nav className='realNavBar'>
                <img src={fotmailtracklogo} alt="mailogo" className='logo'/>
                <div className='nav-links'>
                <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/letters">Letters</Link>
                    <Link to="/track-logs">Track logs</Link>

                   <SignOutDialog />
                    
                    <Link to="/profile-page">
                    <div className='profile'>Profile Page</div>
                    </Link>
                </nav>
                </div>
        </nav>
    )
}

export default RealNavBar;