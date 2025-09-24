import React from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import './homePage.css';
import fotmailtracklogo from '../assets/fotmailtrack.jpeg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const userRole = localStorage.getItem("userRole"); 
  console.log("User Role from localStorage:", userRole);

  return (
    <>
      <RealNavBar />
      <div style={{ marginTop: '100px' }}>
        <NavBar />
      </div>

      <div className='homePage'>
        <div className='content'>
          <h1>FOT-Mail-Track Web solution</h1>
          <div className='middle-content'>
            <div className="content-img">
              <img src={fotmailtracklogo} alt="fotmailtracklogo" className="fotmail-logo" />
            </div>

            <div className="description">
              <p>
                The Faculty of Technology (FOT) Mail Tracking System is a web and mobile application that helps track and manage both internal and external letters. Each letter is assigned a unique ID, allowing users to see where it is in the process. The system improves transparency, accountability, and efficiency by letting senders, recipients, and mail handlers monitor the status of letters in real time.
              </p>
            </div>
          </div>

          {(userRole === "Super Admin" || userRole === "PostalDepartmentMA") && (
            <div className='btn-insert'>
              <Link to="/letters">
                <button className="Insert-Letters">Insert Letters</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
