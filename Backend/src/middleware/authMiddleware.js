const jwt = require('jsonwebtoken');
// const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


module.exports = (req, res, next) => {
    const token = req.header('authorization')?.replace('Bearer ', ''); // Use "Bearer " instead of "bearer "
    console.log('Token received:', token); // Log token for debugging
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Log error for debugging
        res.status(401).json({ message: 'Token is not valid' });
    }
};
