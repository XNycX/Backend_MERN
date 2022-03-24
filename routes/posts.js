const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');
const Post = require('../models/Post');

router.delete("/delete",PostController.deletePostById)
