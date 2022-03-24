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

PostController.getSomePosts = async (req,res) => {

    let userId = req.body.creatorId;
    try {
        res.json(await Post.find({ creatorId: userId }, 'title message').exec());

       // res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }


};

(PostController.deletePostById = async (req, res) => {
    let id = req.body._id;
    try {
      await Post.findOneAndRemove(
        { _id: id },
        res.send({ message: `The post with id: ${id} has been deleted succesfully`, id })
      );
    } catch (error) {
      res.send(error);
    }
  });


(module.exports = PostController);
