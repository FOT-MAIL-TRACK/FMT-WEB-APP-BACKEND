import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';
import LetterTypes from './pages/lettersTypes';
import ExternalLetter from './pages/externalLetter';
import InternalLetter from './pages/internalLetter';
import ProfilePage from './pages/profilePage';
import TrackLogs from './pages/TrackLogs';

function App(){
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route> 
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutPage/>}></Route>
          <Route path='/letters' element={<LetterTypes/>}></Route>
          <Route path='/externalletters' element={<ExternalLetter/>}></Route>
          <Route path='/internalletters' element={<InternalLetter/>}></Route>
          <Route path='/profile-page' element={<ProfilePage/>}></Route>
          <Route path='/track-logs' element={<TrackLogs/>}></Route>
        </Routes>
      </Router>
    )
}

export default App;