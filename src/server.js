const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const letterRoutes = require('./routes/letterRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config();

const app = express();

// Connect to the database
connectDB();

//middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/letters', letterRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log (`server running on port ${PORT}`)
});