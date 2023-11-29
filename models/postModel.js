const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        Text: {
            type: String,
            maxLenght: 500
        },
        img: {
            type: String
        },
        likes: {
            // array containig the user ids
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true
        },
        replies: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                Text: {
                    type: String,
                    required: true
                },
                userProfilePic : {
                    type: String
                },
                username: {
                    type: String
                }
            }
        ]
     },
     {
        timstamps: true
     }
)
    

const Post = mongoose.model("Post", postSchema);
module.exports = Post;