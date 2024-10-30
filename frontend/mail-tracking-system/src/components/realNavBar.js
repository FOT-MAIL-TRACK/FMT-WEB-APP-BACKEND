import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './realNavBar.css';
import fotmailtracklogo from '../assets/fotmailtrack.jpeg';
import SignOutDialog from './SignOutDialog';
import hamburgermenu from '../assets/burger-menu.png';

const RealNavBar= () => {

    const [isNavOpen , setNavOpen] = useState(false);

    const   toggleNav = () => {
        setNavOpen(!isNavOpen);
    }
    return(
        <nav className='realNavBar'>
                <img src={fotmailtracklogo} alt="mailogo" className='logo'/>
                
                <div className='hamburger' onClick={toggleNav}>
                <img src={hamburgermenu}  className='hamburger-icon'></img>
                </div>
                <div className={`nav-links ${isNavOpen ? 'active' : ''}`} >
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