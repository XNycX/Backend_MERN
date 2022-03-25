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
        required: [true,'El titulo es obligatorio introducirlo'],
    },
    message: {
        type: String,
        required: [true,'El mensaje es obligatorio introducirlo'],
    },
    coments: {
        type: Array,
        required: false,
        default: []
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