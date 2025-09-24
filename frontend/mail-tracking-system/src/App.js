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
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminLettersPage from "./pages/AdminLettersPage";

function App(){
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route> 
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/about' element={<AboutPage/>}></Route>
          <Route
            path="/letters"
            element={
              <ProtectedRoute allowedRoles={["Super Admin", "PostalDepartmentMA"]}>
                <LetterTypes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/externalletters"
            element={
              <ProtectedRoute allowedRoles={["Super Admin", "PostalDepartmentMA"]}>
                <ExternalLetter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internalletters"
            element={
              <ProtectedRoute allowedRoles={["Super Admin", "PostalDepartmentMA"]}>
                <InternalLetter />
              </ProtectedRoute>
            }
          />
          <Route path='/profile-page' element={<ProfilePage/>}></Route>
          <Route path='/track-logs' element={<TrackLogs/>}></Route>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Super Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["Super Admin"]}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/letters"
            element={
              <ProtectedRoute allowedRoles={["Super Admin"]}>
                <AdminLettersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    )
}

export default App;