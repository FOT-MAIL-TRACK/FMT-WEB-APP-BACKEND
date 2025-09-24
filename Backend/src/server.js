const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require("cors");
const letterRoutes = require('./routes/letterRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')

dotenv.config();

const app = express();

app.use(express.json());

// Connect to the database
connectDB();

//middleware
app.use(cors());
// app.use(bodyParser.json());


//Routes
app.use('/api/letters', letterRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log (`server running on port ${PORT}`)
});