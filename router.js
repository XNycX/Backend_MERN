const router = require('express').Router();

const users = require('./routes/users');
const posts = require('./routes/posts');

router.use('/users', users);
router.use('posts', posts);

module.exports = router;