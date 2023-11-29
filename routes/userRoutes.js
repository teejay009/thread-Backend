const express = require ('express')
const { signUpUser, loginUser } = require("../conrollers/userController");


const router = express.Router();

router.post('/signup', signUpUser)
router.post('/login', loginUser)

module.exports= router;