
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import the userModel
const User = require("../models/userModel");

// secret key
const SECRET_KEY = "DKSFHKSDFHSDKFHKSDHFKSDHFKSDHFJKSDHFKLSHFKSDHFKJDH";

// routing to login and generate jwt

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({
            message: "user data retrived successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching the user data",
            error: error.message
        })
    }
}

exports.userRegister = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // hashing the password
        bcrypt.hash(password, 5, (err, hashedPassword) => {

            if (err) {
                return res.json({ message: "error hasing the password", err })
            } else {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: password,
                    hashedPassword: hashedPassword,
                    role: role
                });
                newUser.save();
                res.status(201).json({
                    message: "user registration successful",
                    data: newUser
                });
            }
        })

    } catch (error) {
        res.status(400).json({
            message: "User registration failed",
            error: error.message
        })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        //find the user by username
        const user = await User.findOne({ username });

        // check if the user exits and password matches

        if (user) {

            bcrypt.compare(password, user.hashedPassword, (err, result) => {
                if (err) {
                    return res.json({ message: "error comparing the passwords", err })
                } else {
                    if (result) {
                        res.json({ message: "password is correct" })
                        //create the payload based on the user role
                        const payload = {
                            username: user.username,
                            role: user.role
                        }

                        // sign the token with the payload and seckret key
                        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

                        //send the generated token to the client
                        return res.json({ message: "Login successful", token: token });
                    } else {
                        return res.json({ message: "password is incorrect" })
                    }
                }
            })

        } else {
            return res.status(401).json({ message: "Invalid username" })
        }
    } catch (error) {
        res.status(400).json({
            message: "User Login failed",
            error: error.message
        })
    }
}

// Update a user details
exports.userUpdate = async (req, res) => {
    try {
        const recipe = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!recipe) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "user details updated successfully",
            data: recipe
        });

    } catch (error) {
        res.status(400).json({
            message: "Error Updating the user details",
            error: error.message
        })
    }
}


// Delete a user
exports.userDelete = async (req, res) => {
    try {
        const recipe = await User.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "user deleted successfully",
            data: recipe
        });

    } catch (error) {
        res.status(400).json({
            message: "Error deleting the user",
            error: error.message
        })
    }
}

// // middlware to protect the routes and authorise user based on role

exports.userAuth = async (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1]; //bearer token

    if (!token) {
        return res.status(403).json({ message: "access denied, token is missing" })
    }

    // verify the token using the seckret key

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "invalid or expired token" })
        }
        req.user = decoded; //store the decoded payload in the request object
        next();
    })
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: `hello ${req.user.role} ${req.user.username}, Access Denied..Admin only` })
    } else {
        return res.json({ message: `welcome ${req.user.role} ${req.user.username}, You have full access` })
    }

}



