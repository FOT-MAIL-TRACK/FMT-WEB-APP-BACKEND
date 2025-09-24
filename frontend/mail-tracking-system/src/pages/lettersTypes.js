import React from 'react';
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import './lettersTypes.css';
import { Link } from 'react-router-dom';

const LetterTypes = () => {
  return (
    <>
      <RealNavBar />
      <div style={{ marginTop: '100px' }}>
        <NavBar />
      </div>

      <div className="letter-content">
        <Link to='/internalletters' className="letter-card">
          <h2>Internal Letters</h2>
          <p>Track and manage internal communications within the faculty.</p>
        </Link>

        <Link to='/externalletters' className="letter-card">
          <h2>External Letters</h2>
          <p>Monitor external correspondence and ensure timely delivery.</p>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default LetterTypes;
