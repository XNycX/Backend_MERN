const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    },
    city: {
        type: String,
        required: false,
        default: ""
    },
    image_path: {
        type: String,
        required: false,
        default: ""
    },
    followers: {
        type: Array,
        required: false,
        default: []
    },
    following: {
        type: Array,
        required: false,
        default: []
    },
    confirmed: {  
        type: Boolean,
        required: true,
        default: false
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;