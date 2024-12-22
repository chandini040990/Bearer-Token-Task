// import the module mongoose
const mongoose = require("mongoose");

// define the schema for user
const userSchema = new mongoose.Schema({

    username: {
        type: String, required: true
    },

    email: {
        type: String, required: true
    },

    password: {
        type: String, required: true
    },

    hashedPassword: {
        type: String, required: false
    },

    role: {
        type: String, required: true
    }
})

// create the user modele from schema
const User = mongoose.model("User", userSchema);

// exports the model
module.exports = User;