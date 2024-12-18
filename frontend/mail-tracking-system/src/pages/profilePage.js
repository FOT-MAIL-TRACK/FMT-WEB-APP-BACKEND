import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './profilePage.css'
import RealNavBar from '../components/realNavBar';
import NavBar from '../components/NavBar';
import Footer from '../components/footer'
import {Container, Typography, Button , Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, CardMedia, Grid  } from '@mui/material';
import userimg from '../assets/userimg.png'
import CloudinaryUploadWidget from '../components/Cloudaniry';


const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

   // Fetch user profile on component mount

   useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Redirect to login.');
          return;
        }
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setUser(response.data);
          setUpdatedEmail(response.data.email || 'No email provided');
        } else {
          console.error('No data found in response.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, []);  
  
  

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token');

          const response = await axios.put(
            `http://localhost:5001/api/users/users/${userId}`,
            { email: updatedEmail },
            { headers: { Authorization: `Bearer ${token}` }}
          );

          console.log('Updated user:', response.data);
          setUser(response.data);
          setOpenDialog(true);

        } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile');
        }
      };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    }

    // const handleProfilePictureUpload = async (e) => {
    //     e.preventDefault();
    //     if (!profilePicture) {
    //       alert('Please select a picture');
    //       return;
    //     }
    //     try {
    //       const token = localStorage.getItem('token');
    //       const formData = new FormData();
    //       formData.append('profilePicture', profilePicture);
      
    //       const response = await axios.post(
    //         'http://localhost:5001/api/users/profile/upload',
    //         formData,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'multipart/form-data',
    //           },
    //         }
    //       );
    //       setUser(response.data);
    //       alert('Profile picture updated successfully');
    //     } catch (error) {
    //       console.error('Error uploading profile picture:', error);
    //       alert('Failed to upload profile picture');
    //     }
    //   };
      
      

    return (

        <div className='profile-container'>
        
        <RealNavBar />
        <div style={{ marginTop: '100px' }}> 
        <NavBar/>
        </div>

        <Container>
        <Typography variant="h4" gutterBottom align='center' marginTop= '40px'>
          Edit Profile
        </Typography>
        
        {user ? (
            <>
            <div style={{ marginTop: '60px' }}> 
            </div>
            <Card sx={{ maxWidth: 900, margin: '40px auto', boxShadow: '0px 4px 10px rgba(161, 35, 43, 0.5)', borderRadius: 4 ,display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center'}}>
            <CardMedia
                component="img"
                height="200"
                image={user.profilePicture || userimg}
                alt="Profile"
                sx={{ 
                      width: 'auto', 
                      height: 150, 
                      objectFit: 'contain', 
                      borderRadius: '50%', 
                      marginTop: 2,
                      maxWidth: '100%' 
                    }}
              />
            
            <CardContent>
            <Grid container spacing={2} direction="column" marginTop="20px">
            <Grid item>
            <Typography variant="h5" align='center' >Name: {user.name}</Typography>
            </Grid>
            <Grid item>
            <Typography variant="h5" align='center'>Username: {user.username}</Typography>
            </Grid>
                  <Grid item>
                    <Typography variant="h6" align='center'>Email: {user.email}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" align='center'>Role: {user.role}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" align='center'>Faculty: {user.faculty}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" align='center'>Registration Number: {user.registrationNumber}</Typography>
                  </Grid>
                </Grid>
            </CardContent>
            </Card>
          <div style={{ marginTop: '60px' }}> 
          </div>   
          <Typography variant="h4" gutterBottom align='center' marginTop= '20px'>
            Update Information
          </Typography> 
    
        <form onSubmit={handleUpdateProfile}>
            <label> <Typography variant="h6" marginLeft={30}>Email:{user.email}</Typography>
            <div style={{ marginTop: '20px' }}> 
            </div>
            <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            </label>
           
            <Button type="submit" variant="contained" color="primary">
                Update Profile
            </Button>
        </form>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
          >
            <DialogTitle color='#a1232b' align='center'>Profile Updated</DialogTitle>
            <DialogContent>
              <Typography color='black'>
              Profile updated successfully!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="default">
              Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
        ) : (
            <p>Loading...</p>
        )}

        <div style={{ marginTop: '80px' }}> 
        </div>
        
        <div>
            <Typography variant="h4" gutterBottom align='center' marginTop= '20px'>
            Update Profile Picture
            </Typography>
            {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            />
            <Button type="submit" variant="contained" color="secondary" style={{ marginTop: '10px' }}>
            Upload Picture
            </Button> */}
            <CloudinaryUploadWidget/>
        </div>

        </Container>
        <div style={{ marginTop: '200px' }}></div>
        <Footer/>
        </div>
    )
}


export default ProfilePage;