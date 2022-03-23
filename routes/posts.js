const express = require('express');
const router = express.Router();
const { authentication, isAdmin } = require('../middleware/authentication');