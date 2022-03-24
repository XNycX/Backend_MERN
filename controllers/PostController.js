const Post = require("../models/Post.js");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId;

const PostController = {};

PostController.create = async (req, res) => {
   
        const post = {
            creatorId : ObjectId(req.body.creatorId),
            title : req.body.title,
            message : req.body.message,
            createdAt : new Date().toISOString()
        }
    
        const newPost = new Post({ ...post});
    
        try {
            await newPost.save();
    
            res.status(201).json(newPost);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    
};

PostController.getAllPosts = async (req,res) => {

    try {
        res.json(await Post.find().populate('creatorId'));

       // res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }


};

(module.exports = PostController);
