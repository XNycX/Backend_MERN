const router = require('express').Router();

const users = require('./routes/users');

router.use('/users', users);

module.exports = router;