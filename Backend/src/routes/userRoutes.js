const express =require('express');
const{updateUserDetails, getUserDetails, signup, signin , uploadProfilePicture}= require('../controllers/userController');
const { sign } = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup',signup);

router.post('/signin',signin);

router.get('/profile', authMiddleware, getUserDetails);

router.put('/users/:id', authMiddleware, updateUserDetails);

// Upload profile picture
router.post('/profile/upload', authMiddleware, uploadProfilePicture);

module.exports = router;