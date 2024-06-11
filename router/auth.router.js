const express = require('express');
const router = express.Router();
const {AuthController} = require('../controller');

router.post('/ragister', AuthController.handleSignup);

module.exports = router;