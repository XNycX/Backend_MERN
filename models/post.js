const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
    //    required: true,
    //    unique: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    coments: {
        type: [String],
        required: false,
        default: []
    },
    likes: {
        type: [String],
        required: false,
        default: []
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;