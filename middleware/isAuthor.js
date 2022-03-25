const Post = require("../models/Post");

const isAuthor_Post = async (req, res, next) => {
  try {
    const post = await Post.findOne(req.params._id);
    if (post.creatorId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: "No eres el creador de este post" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Ha habido un problema al comprobar la autoría del post", error: { name: error.name, message: error.message, detail: error }})
  }};
     


module.exports = { isAuthor_Post };