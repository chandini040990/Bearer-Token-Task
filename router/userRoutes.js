const express = require('express');

const router = express.Router();

//import the controller
const userController = require("../controllers/userController")

//routers
router.get('/users', userController.getUsers);
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/auth', userController.userAuth);
// router.put('/:id', userController.userUpdate);
// router.delete('/:id', userController.userDelete);


module.exports = router;