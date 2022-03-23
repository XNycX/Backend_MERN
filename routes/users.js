const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const UserController = require('../controllers/UserController');

// http://localhost:5500/users/register (usando un POST).
router.post('/register', UserController.register);
router.get('/confirm/:emailToken',UserController.confirmEmail)


module.exports = router;