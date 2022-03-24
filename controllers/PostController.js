// const { Post, User } = require("../models");
// const PostController = {};

// PostController.updatePost = (req, res) => {
//     let data = req.body;
  
//     let id = req.params.id;
//     Post.update(data, {
//       .where() {
//         id: id,
//       },
//     })
//       .then((updated) => {
//         res.send(updated);
//       })
//       .catch((error) => res.send(error));
//   };

PostController.deletePostById = async (req, res) => {
  let id = req.body._id;
    try {
      await Post.findOneAndRemove({ _id: id },
      res.send({message:`Se ha eliminado el usuario ${id}`,id}));
    }catch (error) {
      res.send(error);
    }
};