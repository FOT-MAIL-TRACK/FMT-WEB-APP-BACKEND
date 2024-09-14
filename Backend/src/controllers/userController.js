const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try{
        // const { name,username, email,role,faculty, department, password ,registrationNumber }= req.body;
        const { name,username, email,role,faculty, password ,registrationNumber }= req.body;
        // const user = new User({ name,username, email,role, faculty, department, password ,registrationNumber});
        const user = new User({ name,username,email,role,faculty,password,registrationNumber});
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
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({mwssage: 'Invalid email or password'});
        }
        const token = jwt.sign({userId: user._id, role: user.role},process.env.JWT_SECRET, { expiresIn: '1h'});
        // res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, faculty: user.faculty, department: user.department, registrationNumber: user.registrationNumber}});
        res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, faculty: user.faculty,  registrationNumber: user.registrationNumber}});
    }catch( error) {
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