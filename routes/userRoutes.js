const express = require ('express')
const { followUnFollowUser, signUpUser, loginUser, logoutUser } = require ("../conrollers/userController");
const protectRoute = require('../middleware/protectRoute');
const getUserProfile = require() 


const router = express.Router();

router.get('/')
router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id', protectRoute, followUnFollowUser) // toggle state(follow/unfollow)

module.exports= router;