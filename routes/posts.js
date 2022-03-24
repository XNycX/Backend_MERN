const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const User = require('../models/User');

router.put('/:id',authentication, User, isAdmin, OrdersController.updatePost);
router.delete('/:id',authentication, User, isAdmin, OrdersController.deletePostById);