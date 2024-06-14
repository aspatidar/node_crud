const express = require('express');
const router = express.Router();
const {AuthController} = require('../controller');
const {handleErrors} = require('../middleware');

router.post('/signup', handleErrors, AuthController.handleSignup);
router.get('/signin', handleErrors, AuthController.handleSignIn);

module.exports = router;