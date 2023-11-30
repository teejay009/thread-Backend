const Post = require("../models/postModel");
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
        const newPost = Post({postedBy, text, img});

        await newPost.save()

        res.status(201).json({message: "Post created successfully", newPost})

    } catch (error) {
        res.status(500).json({ message: error.message }); //Internal server error
		console.log("Error in Create Post: ", error.message);
    }

}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }
        res.status(200).json({post})

    } catch (error) {
        res.status(500).json({message: error.message }); // internal server error
        console.log("Error in get post: ", error.message);
    }
   
}

const deletePost =async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({message: "post not found"})
        }

        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Unauthorized to delete this post"})
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "post deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message: error.message }); // internal server error
        console.log("Error in delete post: ", error.message);
        
    }
}

const likeUnlikePost = async (req, res) => {
    try { 
        const {id:postId} = req.params
        const userId = req.user._id

        const post = await Post.findById(userId)

        if(!post){
            return res.status(404).json({message: "Post not found"})

        }
        const userLikedPost = post.likes.includes(userId)

        if(userLikedPost){
            await Post.updateOne({_id:postId}, {$pull: {likes: userId}})
            res.status(200).json({message: "Post unliked successful"})

        }else{
            post.likes.push(userId)
            await post.save();

            res.status(200).json({message: "Post like successfully"})
        }
    
} catch (error) {
    res.status(500).json({message: error.message }); // internal server error
    console.log("Error in Like Unlike post: ", error.message);
    

}

module.exports = {createPost, getPost, deletePost, likeUnlikePost}






   