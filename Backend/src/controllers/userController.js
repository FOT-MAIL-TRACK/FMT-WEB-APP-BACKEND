const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage });
const dotenv = require('dotenv');


dotenv.config();


exports.signup = async (req, res) => {
    try{
        // const { name,username, email,role,faculty, department, password ,registrationNumber }= req.body;
        const { name,username,email,role,faculty,department,password,registrationNumber }= req.body;
        // const user = new User({ name,username, email,role, faculty, department, password ,registrationNumber});

        if (['FacultyMA', 'Technical Officer', 'Admin', 'PostalDepartmentMA'].includes(role) && !department) {
          // Optional: Check for department-specific validation only for roles that need it
          if (role !== 'FacultyMA' && role !== 'Technical Officer') {
              throw new Error('Department is required for this role');
          }
      }
      
        const user = new User({ name,username,email,role,faculty,department,password,registrationNumber});
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error){
        res.status(400).json({message: error.message});
    }
};

exports.signin = async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if (!user) {
          console.log('User not found'); // Log if user is not found
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            console.log('Password mismatch'); 
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: '5h', 
        });

      console.log('Token generated:', token);
      

        // res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, faculty: user.faculty, department: user.department, registrationNumber: user.registrationNumber}});

        res.json({ 
          token, 
          user: { 
            id: user._id, 
            name: user.name, 
            username: user.username, 
            email: user.email, 
            role: user.role, 
            faculty: user.faculty,  
            registrationNumber: user.registrationNumber,
          }});

    }catch( error) {
        console.error('Signin error:', error);
        res.status(400).json({message: error.message});
    }
};

exports.getUserDetails = async(req,res) => {
    try{
        const user = await User.findById(req.user.userId).select('-password');
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
         res.json(user);
    }catch (error) {
        res.status(400).json({message: error.message});
    }
};       

exports.getUserbyRegno = async (req,res) => {
    
  try{
      const { registrationNumber } = req.params;
      if (!registrationNumber) {
          return res.status(400).json({ message: "Registration number is required." });
      }

      const user = await User.findOne({ registrationNumber });
      if(!user) {
          return res.status(404).json({ message: "User not found." })
      }
      
      res.status(200).json({ name: user.name, role: user.role, faculty: user.faculty, department: user.department });
      
  }
  catch(error){
    res.status(500).json({ message: "Error fetching user details.", error });
  }
}

exports.updateUserDetails = async (req,res) => {
    try {
        const userId = req.user.userId;
        const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { email: req.body.email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

        res.json(updatedUser);

      } catch (err) {
        res.status(500).json({ message: 'Failed to update user' });
      }
}


// exports.uploadProfilePicture = [
//     upload.single('profilePicture'),
//     async (req, res) => {
//       try {
//         const result = await cloudinary.uploader.upload(req.file.path, {
//           folder: 'profile_pictures',
//         });
  
//         const user = await User.findByIdAndUpdate(
//           req.user.userId,
//           { profilePicture: result.secure_url },
//           { new: true }
//         ).select('-password');
  
//         res.json(user);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
//     },
//   ];

    exports.uploadProfilePicture = async (req,res) => {
      const { imageUrl } = req.body;
      const userId = req.user.userId;

      try{
        const newImage = new Image({ imageUrl });
        await newImage.save();
        res.status(201).json({ message: 'Error saving image Url.'})
      }
      catch(error){
        console.error('Error saving image URL:', error);
        res.status(500).json({ message: 'Error saving image URL.' });
      }
    }