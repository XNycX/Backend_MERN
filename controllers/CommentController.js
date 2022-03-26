const Comment = require("../models/Comment.js");
const ObjectId = require('mongoose').Types.ObjectId;

const CommentController = {};

CommentController.create = async (req, res) => {
   
        const comment = {
            creatorId : ObjectId(req.body.creatorId),
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
    let id = req.body._id;
    try {
      await Comment.findOneAndRemove(
        { _id: id },
        res.send({ message: `The Comment with id: ${id} has been deleted succesfully`, id })
      );
    } catch (error) {
      res.send(error);
    }
  };

CommentController.likes = async (req, res) => {

    let _id = req.body._id
  
    let id_commentLiked = req.body._id
  
    try {
        await Comment.findOneAndUpdate(
            { _id: _id },
            {
                $push: {
                    likes: {
                        "commentLiked": id_commentLiked
                    }
                }
            }
        )
        res.send("Has dado like a este comment")
  
    } catch (error) {
        res.send(error)
    }
  };

  CommentController.unlikes = async (req, res) => {

    let _id = req.body._id
  
    let id_commentLiked = req.body._id
  
    try {
        await Comment.findOneAndUpdate(
            { _id: _id },
            {
                $pull: {
                    likes: {
                        "commentLiked": id_commentLiked
                    }
                }
            }
        )
        res.send("Has quitado un like a este comment")
  
    } catch (error) {
        res.send(error)
    }
  };
  CommentController.editComment = async (req, res) => {
    let id = ObjectId(req.params.id);

    try {
    Comment.updateOne({ _id: id }, { title: req.body.title }, { message: req.body.message })
      await Comment.updateOne(
         { id: id }, {
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
