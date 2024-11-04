import React, {useState} from 'react';
import {Button}  from '@mui/material';


const CloudinaryUploadWidget = () => {
    const [imageUrl, setImageUrl] = useState('');

    const handleUpload = () => {
        if (window.cloudinary) {
            window.cloudinary.openUploadWidget(
                {
                    cloudName: 'dalhnxzth', // Replace with your Cloudinary cloud name
                    uploadPreset: 'new_upload_preset', // Replace with your upload preset
                    sources: ['local', 'url', 'camera'], // Choose your sources
                },
                (error, result) => {
                    if (result && result.event === 'success') {
                        const uploadedImageUrl = result.info.secure_url;
                        console.log('Upload successful! Here is the info:', result.info);
                        setImageUrl(uploadedImageUrl);
                        saveImageUrlToDatabase(uploadedImageUrl);
                        // Handle the image URL as needed
                    } else if (error) {
                        console.error('Upload failed: ', error);
                    }
                }
            );
        } else {
            console.error('Cloudinary is not loaded.');
        }
    };

    const saveImageUrlToDatabase = async (url) =>{
        try{
            const response = await fetch('http://localhost:5001/api/users/profile/upload', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl: url }),
            });
            if(!response.ok) {
                throw new Error('Failed to save image URL to database');
            }
            const data = await response.json();
            console.log('Image URL saved successfully: ', data);
        }
        catch (error){
            console.error('Error saving image URL: ', error);
        }
    }

    return (
        <div>
            <Button 
            onClick={handleUpload} 
            type="submit" 
            variant="contained" 
            style={{
                 marginTop: '10px',
                 width : '400px',
                 height: '50px',
                 backgroundColor: '#a1232b',
                 borderRadius: '5px',
                 marginLeft: '370px'
                  }}>
            Upload Image    
            </Button>
            {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '200px', marginTop: '10px' }} />}
        </div>
    );
};

export default CloudinaryUploadWidget;
