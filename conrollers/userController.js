const User = require ('../models/useModel')
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/helper/generateTokenAndSetCookies');

const signUpUser = async(req, res) => {
   try {
    const {name, email, username, password} = req.body;
    const user = await User.findOne({$or:[{email}, {username}]})

    if (user) {
        return res.status(400).json({message: 'User already exits'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User ({
        name, 
        email,
        username,
        password: hashedPassword,
    })
    await newUser.save()

    if(newUser){

        generateTokenAndSetCookie(newUser._id, res)
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username

        })
    }

   } catch (error) {
    res.status(500).json({message: error.message})
    console.log(("Error in signupUser: ", error.message));
    
   }
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect) return res.status(400).json({error: "Invalid username or password"})

        if(user.isFrozen) {
            user.isFrozen = false
            await user.save()
        }
 
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({ 
            _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        profilePic: user.profilePic

    })

    } catch (err) {
        res.status(500).json({error: err.message})
        console.log("Error in loginUser: ", err.message)


    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 1})
        res.status(200).json({message: "user logged out successfully"})

    } catch(err) {
        res.status(500).json({error: err.message})
        console.log("Error in logoutUsers: ", err.message)
    }

} 

const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params
        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id)

        if (id === req.user._toString())
        return res.status(400).json({error: "You can not follow/Unfollow your self"})
    if (!userToModify || !currentUser)
    return res.status(400).json({error: "User not Found"});

    const isFollowing = currentUser.following.includes(id)
    if(!isFollowing) {
        // UNFOLLOW use
    }

    }
}





module.exports = { signUpUser, loginUser, logoutUser, followUnfollowUser } ;