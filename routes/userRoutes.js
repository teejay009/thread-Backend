const express = require ('express')
const { getUserProfile, followUnFollowUser, signUpUser, loginUser, logoutUser } = require ("../conrollers/userController");
const protectRoute = require('../middleware/protectRoute');


const router = express.Router();

router.get('/profile/:query', getUserProfile)
router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id', protectRoute, followUnFollowUser) // toggle state(follow/unfollow)

module.exports= router;


