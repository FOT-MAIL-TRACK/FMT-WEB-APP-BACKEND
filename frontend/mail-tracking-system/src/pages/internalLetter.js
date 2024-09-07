import React from 'react';
import './internalLetter.css';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';

const InternalLetter = () => {
    return(
        <>
            <RealNavBar/>
            <div style={{ marginTop: '100px' }}> 
            <NavBar />
             </div>
            <Footer/>
        </>
    )
}

export default InternalLetter;