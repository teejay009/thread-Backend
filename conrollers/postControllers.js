const User = require("../models/useModel");

const createPost = async (req, res) => {
    try {
        const {postedBy, text, img} = req.body;

        if(!postedBy || !text) {
            return res.status(400).json({message: "postedBy text fields are required"})
        }
        const user = await User.findById(postedBy);

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const maxLenght = 500;

        if(text.lenght > maxLenght){
            return res.status(400).json({message: `Text must be lessthan ${maxLenght} characters`})
        }
        const newPost = newPost({postedBy, text, img});

        await newPost.save()

        res.status(201).json({message: "Post created successfully", newPost})
        




   