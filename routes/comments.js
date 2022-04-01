const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const { isAuthor_Comment } = require('../middleware/isAuthor');
const CommentController = require('../controllers/CommentController');

router.post('/create', authentication,CommentController.create);
router.get('/getAll', CommentController.getAllComments);
router.get('/getSome', CommentController.getSomeComments);
router.get('/getComment', CommentController.getCommentById);
router.delete('/deleteId/:_id', authentication, isAuthor_Comment, CommentController.deleteCommentById);
router.post('/addLike/:_id', authentication, CommentController.likes);
router.post('/unlike/:_id', authentication, CommentController.unlikes);
router.put('/edit/:_id', authentication, isAuthor_Comment, CommentController.editComment);

module.exports = router;