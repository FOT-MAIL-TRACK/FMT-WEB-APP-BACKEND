// controllers/adminController.js
const User = require('../models/user');
const Letter = require('../models/letter');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllLettersWithLogs = async (req, res) => {
  try {
    const letters = await Letter.find()
      .populate('currentHolder trackingLog.holder', 'name department registrationNumber');

    const lettersWithType = letters.map(letter => {
      let letterType = 'Internal';
      if (letter.uniqueID.startsWith('EXT')) letterType = 'External';
      else if (letter.uniqueID.startsWith('INT')) letterType = 'Internal';

      return {
        ...letter.toObject(),
        letterType
      };
    });

    res.status(200).json(lettersWithType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new user
exports.createUser = async (req, res) => {
  try {
    const { name, registrationNumber, role, faculty, department, email, password } = req.body;
    const userExists = await User.findOne({ registrationNumber });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({
      name,
      registrationNumber,
      role,
      faculty,
      department,
      email,
      password // Ideally, hash password using bcrypt
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
