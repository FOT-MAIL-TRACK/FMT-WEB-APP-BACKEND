import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './profilePage.css'
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer'



const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

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

    return (

        <div className='profile-container'>
        <div className='navbar'>
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar/>
        </div>
        </div>
       
        {user ? (
            <>
                <h1>Profile Page</h1>
                <img src={user.profilePicture} alt="Profile" width="150"/>
                <p>Name: {user.name}</p>
                <p>User name: {user.Username}</p>
                <p>Email: {user.email}</p>
                <p>Registration Number: {user.registrationNumber}</p>
                <p>Role: {user.role}</p>
                <p>Faculty: {user.faculty}</p>
                <p>Department: {user.department}</p>
            </>
        ) : (
            <p>Loading...</p>
        )}
        <h2>Update Information</h2>
        <form onSubmit={handleUpdateProfile}>
            <label><h3> Name: </h3>
            </label>
            <label> <h3>Email:</h3>
            <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            </label>
           
            <button type="submit">Update Profile</button>
        </form>

        <h2>Update Profile Picture</h2>
        <form onSubmit={handleProfilePictureUpload}>
            <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            />
        <button type="submit">Upload Picture</button>
        </form>
        <Footer/>

        </div>

       
    
    )
}


export default ProfilePage;