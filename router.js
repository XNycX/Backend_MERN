const router = require('express').Router();

const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;