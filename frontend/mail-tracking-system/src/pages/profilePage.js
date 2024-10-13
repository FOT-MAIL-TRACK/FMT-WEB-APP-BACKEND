import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './profilePage.css'
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer'
import {Container, Typography, Button  } from '@mui/material';


const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

   // Fetch user profile on component mount

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5001/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setUpdatedEmail(response.data.email);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
    }
    fetchUserProfile();
    }, []);
  

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(
            'http://localhost:5001/api/users/profile',
            {
              email: updatedEmail,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
          alert('Profile updated successfully');
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile');
        }
      };


    const handleProfilePictureUpload = async (e) => {
        e.preventDefault();
        if (!profilePicture) {
          alert('Please select a picture');
          return;
        }
        try {
          const token = localStorage.getItem('token');
          const formData = new FormData();
          formData.append('profilePicture', profilePicture);
      
          const response = await axios.post(
            'http://localhost:5001/api/users/profile/upload',
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          setUser(response.data);
          alert('Profile picture updated successfully');
        } catch (error) {
          console.error('Error uploading profile picture:', error);
          alert('Failed to upload profile picture');
        }
      };
      
      

    return (

        <div className='profile-container'>
        <div className='navbar'>
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar/>
        </div>
        </div>

        <Container>
        <Typography variant="h4" gutterBottom align='center' marginTop= '40px'>
          Edit Profile
        </Typography>
        {user ? (
            <>
            <img
              src={user.profilePicture || '/default-profile.png'}
              alt="Profile"
              width="150"
              style={{ borderRadius: '50%' }}
            />
            <Typography variant="h5">Name: {user.name}</Typography>
            <Typography variant="h5">Username: {user.username}</Typography>
            <Typography variant="h5">Email: {user.email}</Typography>
            <Typography variant="h5">Role: {user.role}</Typography>
            <Typography variant="h5">Faculty: {user.faculty}</Typography>
            <Typography variant="h5">Department: {user.department}</Typography>
            </>
        ) : (
            <p>Loading...</p>
        )}
        {/* <Typography variant="h5" gutterBottom align='center' marginTop= '20px'>
        Update Information
        </Typography> */}
    
        {/* <form onSubmit={handleUpdateProfile}>
            <label> <h3>Email:</h3>
            <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            </label>
           
            <Button type="submit" variant="contained" color="primary">
                Update Profile
            </Button>
        </form> */}

        
        <form onSubmit={handleProfilePictureUpload}>
            <Typography variant="h5" gutterBottom align='center' marginTop= '20px'>
            Update Profile Picture
            </Typography>
            <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            />
            <Button type="submit" variant="contained" color="secondary" style={{ marginTop: '10px' }}>
            Upload Picture
            </Button>
        </form>

        </Container>
        <div style={{ marginTop: '200px' }}></div>
        <Footer/>
        </div>

       
    
    )
}


export default ProfilePage;