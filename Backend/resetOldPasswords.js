const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 
const User = require('./src/models/user'); 

const MONGO_URI = process.env.MONGO_URI;

const resetPassword = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB connected');

    const oldUsers = [
      { email: 'maleesha.sandeepa@sjp.ac.lk', newPassword: 'maleesha12345' },
    ];

    for (let u of oldUsers) {
      const hashed = await bcrypt.hash(u.newPassword, 10);
      const result = await User.updateOne(
        { email: u.email },
        { $set: { password: hashed } }
      );
      console.log(`Password reset for ${u.email}:`, result.modifiedCount);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

resetPassword();
