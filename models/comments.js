const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
        unique: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Post",
        required: true,
        unique: false
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

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;