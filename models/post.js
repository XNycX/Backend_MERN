const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
    },
    commentsId:[ {
        type: mongoose.Schema.Types.ObjectId, ref: "Comment",
    }],
    title: {
        type: String,
        required: [true,'El titulo es obligatorio introducirlo'],
    },
    message: {
        type: String,
        required: [true,'El mensaje es obligatorio introducirlo'],
    },
    likes: {
        type: Array,
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