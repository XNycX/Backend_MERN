const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const { isAuthor_Post } = require('../middleware/isAuthor');
const PostController = require('../controllers/PostController');

// http://localhost:5500/posts/create (usando un POST).
// Recibe por body un json con los datos del post y los guarda en la BBDD
router.post('/create',authentication, PostController.create);
router.get('/getAll', PostController.getAllPosts);
router.get('/getSome', PostController.getSomePosts);
router.delete('/deleteId/:_id', authentication, isAuthor_Post, PostController.deletePostById);
router.post('/addLike/:_id', authentication, PostController.likes);
router.post('/unlike/:_id', authentication, PostController.unlikes);
router.put('/edit/:_id', authentication, isAuthor_Post, PostController.editPost);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;
