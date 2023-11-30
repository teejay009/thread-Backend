const User = require("../models/useModel");

const createPost = async (req, res) => {
    try {
        const {postedBy, text, img} = req.body;

        if(!postedBy || !text) {
            return res.status(400).json({message: "postedBy text fields are required"})
        }
        const user = await User.findById(postedBy);
    }

}

module.exports = {
    createPost
}