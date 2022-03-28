const Comment = require("../models/comments.js");
const ObjectId = require('mongoose').Types.ObjectId;

const CommentController = {};

CommentController.create = async (req, res) => {
   
        const comment = {
            creatorId: ObjectId(req.user._id),
            postId: ObjectId(req.body.postId),
            message : req.body.message,
            createdAt : new Date().toISOString()
        }
    
        const newComment = new Comment({ ...comment});
    
        try {
            await newComment.save();
    
            res.status(201).json(newComment);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    
};

CommentController.getAllComments = async (req,res) => {

    try {
        res.json(await Comment.find().populate('creatorId'));

    } catch (error) {
        res.status(409).json({ message: error.message });
    }


};

CommentController.getSomeComments = async (req,res) => {

    let userId = req.body.creatorId;
    try {
        res.json(await Comment.find({ creatorId: userId }, 'message').exec());

    } catch (error) {
        res.status(409).json({ message: error.message });
    }


};

CommentController.deleteCommentById = async (req, res) => {
    let _id = req.params._id;
    try {
      await Comment.findOneAndRemove(
        { _id: _id },
        res.send({ message: `The Comment with id: ${_id} has been deleted succesfully`, _id })
      );
    } catch (error) {
      res.send(error);
    }
  };

CommentController.likes = async (req, res) => {

    let _id = req.params._id
  
    let id_userLike = req.user._id
  
    try {
        await Comment.findOneAndUpdate(
            { _id: _id },
            {
                $push: {
                    likes: id_userLike    
                }
            }
        )
        res.send("Has dado like a este comment")
  
    } catch (error) {
        res.send(error)
    }
  };

  CommentController.unlikes = async (req, res) => {

    let _id = req.params._id
  
    let id_userLike = req.user._id
  
    try {
        await Comment.findOneAndUpdate(
            { _id: _id },
            {
                $pull: {
                    likes: id_userLike
                }
            }
        )
        res.send("Has quitado un like a este comment")
  
    } catch (error) {
        res.send(error)
    }
  };
  CommentController.editComment = async (req, res) => {
    let _id = req.params._id;

    try {
      await Comment.updateOne(
         { id: _id }, {
             $set: {
                 message: req.body.message
                    }
                }, {returnNewDocument: true}
            )
        res.status(200).json( {msg:"Has modificado este comment"}) 
} catch (error) {
    res.status(500).json({ msg: `Tu mensaje`, error: { name: error.name, message: error.message, detail: error } });
}
};

(module.exports = CommentController);
