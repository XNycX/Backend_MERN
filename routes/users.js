const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const UserController = require('../controllers/UserController');

// http://localhost:5500/users/register (usando un POST).
router.post('/register', UserController.register);
router.get('/confirm/:emailToken', UserController.confirmEmail);
router.delete('/delete', authentication, UserController.deleteById);
router.get('/', UserController.getAllUsers);
router.get('/nickname', UserController.getUserByNickname);
router.post('/following', authentication, UserController.following);
router.post('/unfollowing', authentication, UserController.unfollowing);
router.post('/followers', authentication, UserController.followers);
router.post('/unfollowed', authentication, UserController.unfollowed);
router.post('/login', UserController.login);
router.put('/edit',authentication, UserController.updateUser);
router.delete('/delete', UserController.deleteById);

module.exports = router;