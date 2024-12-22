const express = require('express');

const router = express.Router();

//import the controller
const userController = require("../controllers/userController")

//router to get all,get by id,post,update,delete the users
router.get('/users', userController.getUsers);
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.put('/:id', userController.userUpdate);
router.delete('/:id', userController.userDelete);
router.get('/auth', userController.userAuth);

module.exports = router;