const express = require ('express')
const { signUpUser, loginUser, logoutUser } = require("../conrollers/userController");


const router = express.Router();

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports= router;