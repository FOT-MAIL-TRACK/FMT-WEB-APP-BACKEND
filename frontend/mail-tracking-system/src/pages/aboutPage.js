import React from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import './aboutPage.css';

const AboutPage = () => {
    return (
        <>
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar />
        </div>
        <div className='about-container' >
            <h2 className='h2-class'>About FOT-MAIL-TRACK</h2>
        

        <div className='about-section'>
            <h3 className='h3-class'>Welcome Message</h3>
            <p className='p-class'>Let's solve the mesh! Welcome ya'all to the mail tracking system of University of Sri Jayawardenepura</p>
        </div>

        <div className="about-section">
            <h3 className='h3-class'>Our Mission</h3>
            <p className='p-class'>Let's solve the mesh! Welcome ya'all to the mail tracking system of University of Sri Jayawardenepura</p>
        </div>
        </div>

        <Footer />
        </>
    )
}

export default AboutPage;