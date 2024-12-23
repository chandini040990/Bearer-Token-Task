const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const userRoutes = require("./router/userRoutes");

// initialize enviormment variables
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// contect to the mongodb database
connectDB();

// middleware to parese the json request
app.use(bodyParser.json());

// routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
    console.log(`Server is running at the URL http://localhost:${PORT}`)
})