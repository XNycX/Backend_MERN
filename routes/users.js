const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const UserController = require('../controllers/UserController');

// http://localhost:5500/users/register (usando un POST).
router.get('/confirm/:emailToken', UserController.confirmEmail);
router.get('/', UserController.getAllUsers);
router.get('/nickname', UserController.getUserByNickname);
router.post('/register', UserController.register);
router.post('/followers', UserController.following);
router.post('/unfollow', UserController.unfollowing);
router.post('/login', UserController.login);
router.put('/edit/:id', UserController.updateUser);
router.delete('/delete', UserController.deleteById);

module.exports = router;