import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import HomePage from './pages/homePage';
import AboutPage from './pages/aboutPage';

function App(){
    return (
      <Router>
        <Routes>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route> 
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutPage/>}></Route>
        </Routes>
      </Router>
    )
}

export default App;