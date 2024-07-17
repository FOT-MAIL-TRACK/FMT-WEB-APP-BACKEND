const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    }
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;