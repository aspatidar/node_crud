const express = require('express');
const router = express.Router();
const {AuthController} = require('../controller');

router.post('/signup', AuthController.handleSignup);
router.get('/signin', AuthController.handleSignIn);

module.exports = router;