const Post = require("../models/post.js");
const ObjectId = require('mongoose').Types.ObjectId;

const PostController = {};

PostController.create = async (req, res) => {
        const post = {
            creatorId : req.user._id,
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
        res.json(await Post.find().populate('creatorId').populate('commentsId'));
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

PostController.getSomePosts = async (req,res) => {

    let userId = req.body.creatorId;
    try {
        res.json(await Post.find({ creatorId: userId }, 'title message').exec());
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

PostController.getPostById = async (req, res) => {
    let _id = req.params._id;
    try {
      await Post.findById(
        (_id ),
        res.send({ message: `The post with id: ${_id} has been found succesfully`, _id })
      );
    } catch (error) {
      res.send(error);
    }
  };


PostController.deletePostById = async (req, res) => {
    let _id = req.params._id;
    try {
      await Post.findOneAndRemove(
        { _id: _id },
        res.send({ message: `The post with id: ${_id} has been deleted succesfully`, _id })
      );
    } catch (error) {
      res.send(error);
    }
  };

PostController.likes = async (req, res) => {

    let _id = req.params._id;
  
    let id_userLike = req.user._id;
  
    try {
        await Post.findOneAndUpdate(
            { _id: _id },
            {
                $push: {
                    likes: id_userLike
                },
            },
        );
        res.send("Has dado like a este post")
  
    } catch (error) {
        res.send(error)
    }
  };

  PostController.unlikes = async (req, res) => {

      let _id = req.params._id
      
    let id_postLiked = req.user._id
  
    try {
        await Post.findOneAndUpdate(
            { _id: _id },
            {
                $pull: {
                    likes: id_postLiked
                    
                }
            }
        )
        res.send("Has quitado un like a este post")
  
    } catch (error) {
        res.send(error)
    }
  };
  PostController.editPost = async (req, res) => {
    let _id = req.params._id;

    try {
      await Post.updateOne(
         { _id: _id }, {
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
