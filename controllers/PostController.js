const Post = require("../models/Post.js");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");

const PostController = {};

PostController.create = async (req, res) => {
   
        const post = req.body;
    
        const newPost = new Post({ ...post, createdAt: new Date().toISOString() });
    
        try {
            await newPost.save();
    
            res.status(201).json(newPost);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    
};

(module.exports = PostController);
