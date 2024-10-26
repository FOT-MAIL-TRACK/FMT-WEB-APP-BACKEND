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
        

        <div className="about-section">
            <h3 className='h3-class'>Welcome Message</h3>
            <p className='p-class'>Welcome to FOT-MAIL-TRACK, the Faculty of Technology's innovative mail tracking system. Designed to streamline and simplify the process of managing internal and external correspondence, FOT-MAIL-TRACK provides real-time updates, secure login, and efficient tracking of letters and parcels. Whether you're a faculty member or a department head, our platform ensures that your mail is organized and easy to manage, offering enhanced communication within the university. Experience fast, reliable mail tracking tailored to the University of Sri Jayawardenepura’s unique needs.</p>
        </div>

        <div className="about-section">
            <h3 className='h3-class'>Our Mission</h3>
            <p className='p-class'>Our mission is to enhance communication and operational efficiency within University of Sri Jayawardenepura through a secure and reliable mail tracking system. We aim to provide users with real-time updates, streamlined processes for managing correspondence, and seamless integration of internal and external mail logistics. By prioritizing transparency and accountability, FOT-MAIL-TRACK supports the university commitment to innovation and collaboration, ensuring that all correspondence is handled efficiently, promoting a smoother and more organized administrative experience.</p>
        </div>
        </div>

        <Footer />
        </>
    )
}

export default AboutPage;