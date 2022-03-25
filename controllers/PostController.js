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

PostController.deletePostById = async (req, res) => {
    let id = req.body._id;
    try {
      await Post.findOneAndRemove(
        { _id: id },
        res.send({ message: `The post with id: ${id} has been deleted succesfully`, id })
      );
    } catch (error) {
      res.send(error);
    }
  };

PostController.likes = async (req, res) => {

    let _id = req.body._id
  
    let id_postLiked = req.body._id
  
    try {
        await Post.findOneAndUpdate(
            { _id: _id },
            {
                $push: {
                    likes: {
                        "postLiked": id_postLiked
                    }
                }
            }
        )
        res.send("Has dado like a este post")
  
    } catch (error) {
        res.send(error)
    }
  };

  PostController.unlikes = async (req, res) => {

    let _id = req.body._id
  
    let id_postLiked = req.body._id
  
    try {
        await Post.findOneAndUpdate(
            { _id: _id },
            {
                $pull: {
                    likes: {
                        "postLiked": id_postLiked
                    }
                }
            }
        )
        res.send("Has quitado un like a este post")
  
    } catch (error) {
        res.send(error)
    }
  };
  PostController.editPost = async (req, res) => {
    let id = ObjectId(req.params.id);

    try {
    Post.updateOne({ _id: id }, { title: req.body.title }, { message: req.body.message })
      await Post.updateOne(
         { id: id }, {
             $set: {
                 title: req.body.title,
                 message: req.body.message
                    }
                }, {returnNewDocument: true}
            )
        res.status(200).json( {msg:"Has modificado este post"}) 
} catch (error) {
    res.status(500).json({ msg: `Tu mensaje`, error: { name: error.name, message: error.message, detail: error } });
}
};

(module.exports = PostController);
