import React from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer'
import './lettersTypes.css';
import {Link} from 'react-router-dom';


const LetterTypes = () =>{
    return(
        <>
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar/>
        </div>
        <div className='letter-content'>
            <div className='letter-left-section'>
                <Link to = '/internaletters'>
                <h2>Internal Letters</h2>
                </Link>
            </div>
            <div className='letter-right-section'>
                <Link to = '/externaletters'>
                <h2>External Letters</h2>
                </Link>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default LetterTypes;