import React from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer'
import './homePage.css';
import fotmailtracklogo from '../assets/fotmailtrack.jpeg';

const HomePage = () =>{
    return (
        <>
        <RealNavBar />
        <div style={{ marginTop: '0px' }}>
        <NavBar/>
        </div>
       
        <div className='homePage'>
            
            <div className='content'>
                <h1 >FOT-Mail-Track Web solution </h1>
            <div className='middle-content'>

            <div className="content-img">
                <img src={fotmailtracklogo} alt="fotmailtracklogo" className="fotmail-logo" />
            </div>

            <div class="description">
                <p>The Faculty of Technology Mail Tracking System aims to streamline and enhance the process of managing and tracking physical mail within the faculty of technology, university of Sri Jayewardenepura. The web application will generate letters with unique QR codes using Crystal Reports, assign authorities for the mail to pass through, and manage the overall workflow.</p>
            </div>
            </div>

            <div className='btn-insert'>
                <button class="Insert-Letters">Insert Letters</button>
            </div>
            </div>
        </div>

        <Footer />
        </>
    ) 

}

export default HomePage;