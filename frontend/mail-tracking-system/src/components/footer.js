import React from 'react';
import usjlogo from '../assets/usjp-logo.png';
import fotmailtracklogo from '../assets/fotmailtrack.jpeg';

import './footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={usjlogo} alt="University Logo" />
        </div>
        <div className='foot-con'>
        
            <h2>University of Sri Jayewardenepura</h2>
        
        <div className="footer-details">
        <a href="https://www.sjp.ac.lk/">
          <p>University of Sri Jayewardenepura</p>
        </a>
        <a href="https://tech.sjp.ac.lk/">
          <p>Faculty of Technology</p>
        </a>
        </div>
        </div>
        <div className="footer-mailtrack-logo">
          <img src={fotmailtracklogo} alt="mailtrack Logo" />
        </div>
        <div className="contact-us">
          <p>Contact us</p>
          <p>Email: <a href="mailto:help@fot.sjp.ac.lk">help@fot.sjp.ac.lk</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright All Right Reserved 2024, FOT-MAIL-TRACK</p>
      </div>
    </footer>
  );
};





// const Footer = () =>{
//     return(
//         <div className='footer-container'>
//             <div className='footer-container1'>
//                 <img src={usjlogo} alt='logo' className="footer-logo"/>
//                 <h1 className="footer-text">University of Sri Jayawardenepura</h1>
//             </div>
//         </div>
//     )
// }

export default Footer;