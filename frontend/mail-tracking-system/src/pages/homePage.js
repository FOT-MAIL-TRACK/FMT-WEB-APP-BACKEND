import React from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import './homePage.css';

const HomePage = () =>{
    return (
        <>
        <RealNavBar />
        <div style={{ marginTop: '1000px' }}>
        <NavBar/>
        </div>
       
        <div className='homePage'>
            
            <div className='content'>

            </div>
        </div>
        </>
    ) 

}

export default HomePage;