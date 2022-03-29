const Post = require("../models/post.js");
const Comment = require("../models/comments.js");

const isAuthor_Post = async (req, res, next) => {
  let idPost = req.params._id;
  try {
    const post = await Post.findById(idPost);
    if (post.creatorId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "No eres el creador de este post" });
    }
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Ha habido un problema al comprobar la autoría del post", error: { name: error.name, message: error.message, detail: error }})
  }};
     
  const isAuthor_Comment = async (req, res, next) => {
    try {
      const comment = await Comment.findOne(req.params._id);
      if (comment.creatorId.toString() !== req.user._id.toString()) {
        return res.status(403).send({ message: "No eres el creador de este comment" });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Ha habido un problema al comprobar la autoría del comment", error: { name: error.name, message: error.message, detail: error }})
    }};
  


module.exports = { isAuthor_Post, isAuthor_Comment };