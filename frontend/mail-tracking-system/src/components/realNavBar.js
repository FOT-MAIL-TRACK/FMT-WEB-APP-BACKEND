import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './realNavBar.css';
import fotmailtracklogo from '../assets/fotmailtrack.jpeg';
import SignOutDialog from './SignOutDialog';
import { Menu, X } from 'lucide-react';

const RealNavBar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!isNavOpen);
  const closeNav = () => setNavOpen(false);

  const role = localStorage.getItem("userRole");


  return (
    <nav className="realNavBar">
      <div className="nav-left">
        <img src={fotmailtracklogo} alt="mailogo" className="logo" />
      </div>

      {/* Desktop links */}
      <div className="nav-links desktop-links">
        {role === "Super Admin" && (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
            </>
          )}
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        {(role === "Super Admin" || role === "PostalDepartmentMA") && (
        <>
          <Link to="/letters">Letters</Link>
        </>
        )}
        <Link to="/track-logs">Track Logs</Link>
        
        <SignOutDialog />
        <Link to="/profile-page" className="profile-link">Profile</Link>
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={toggleNav}>
        {isNavOpen ? <X size={32} /> : <Menu size={32} />}
      </div>

      {/* Mobile menu */}
      <div className={`nav-links mobile-links ${isNavOpen ? 'active' : ''}`}>
        {role === "Super Admin" && (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
            </>
          )}
        <Link to="/home" onClick={closeNav}>Home</Link>
        <Link to="/about" onClick={closeNav}>About</Link>
        {(role === "Super Admin" || role === "PostalDepartmentMA") && (
        <>
          <Link to="/letters" onClick={closeNav}>Letters</Link>
        </>
        )}
        <Link to="/track-logs" onClick={closeNav}>Track Logs</Link>
        
        <SignOutDialog />
        <Link to="/profile-page" className="profile-link" onClick={closeNav}>Profile</Link>
      </div>
    </nav>
  );
};

export default RealNavBar;
