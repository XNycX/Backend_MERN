const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const UserController = require('../controllers/UserController');

// http://localhost:5500/users/register || https://mernsocialbackend.herokuapp.com/users/ (usando un POST).
router.post('/register', UserController.register);
router.get('/confirm/:emailToken', UserController.confirmEmail);
router.delete('/deleteId/:_id', authentication, UserController.deleteById);
router.get('/', UserController.getAllUsers);
router.get('/nickname/:nickname', UserController.getUserByNickname);
router.get('/info', authentication,UserController.getUserInfo);
router.post('/login', UserController.login);
router.put('/edit', authentication, UserController.updateUser);
router.put('/updatePassword', authentication, UserController.updatePassword);
router.put('/follow/:_id', authentication, UserController.follow);
router.put('/unfollow/:_id', authentication, UserController.unfollow);


module.exports = router;