import React from 'react';
import usjlogo from '../assets/usjp-logo.png'
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
    <div className="navbar-content">
      <img src={usjlogo} alt="University Logo" className="navbar-logo" />
      <h1 className="navbar-text">University of Sri Jayewardenepura</h1>
    </div>
  </div>
  );
}

export default NavBar;
