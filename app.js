const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require("./config/db");
const userRoutes = require("./router/userRoutes");

// initialize enviormment variables
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// contect to the mongodb database
connectDB();

// middleware to parese the json request
app.use(express.json());

// routes
app.use("/api", userRoutes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running at the URL http://localhost:${PORT}`)
})