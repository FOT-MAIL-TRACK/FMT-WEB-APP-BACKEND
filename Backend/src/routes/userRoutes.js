const express =require('express');
const{register, login, getUserDetails, signup, signin}= require('../controllers/userController');
const { sign } = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup',signup);

router.post('/signin',signin);

router.get('/me', authMiddleware, getUserDetails);

module.exports = router;