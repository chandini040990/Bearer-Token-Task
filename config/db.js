// import the module mongoose
const mongoose = require("mongoose");

// connect to mongodb 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected")
    } catch (error) {
        console.log("Error in conecting the MongoDB", error);
    }
}

module.exports = connectDB;