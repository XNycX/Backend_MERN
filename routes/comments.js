const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const { isAuthor_Comment } = require('../middleware/isAuthor');
const CommentController = require('../controllers/CommentController');

// Recibe por body un json con los datos del post y los guarda en la BBDD
router.post('/create', CommentController.create);
router.get('/getAll', CommentController.getAllComment);
router.get('/getSome', CommentController.getSomecomments);
router.delete('/deleteId', authentication, isAuthor_Comment, CommentController.deleteCommentById);
router.post('/addLike', authentication, CommentController.likes);
router.post('/unlike', authentication, CommentController.unlikes);
router.put('/edit/:id', authentication, isAuthor_Comment, CommentController.editComment);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;