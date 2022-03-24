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
    let id = req.params.id;
    try {
     await Movie.destroy({
        where: {
          id: id,
        },
        truncate: false,
      });
      res.send({message:`Se ha eliminado la pelicula ${id}`,id});
    } catch (error) {
      res.send(error);
    }
  };