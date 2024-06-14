const express = require('express');
const router = express.Router();
const {UserController} = require('../controller');
const {validateToken, handleErrors} = require('../middleware');

router.get('/users', validateToken ,handleErrors, UserController.handlGetAllUser);
router.post('/create',validateToken, handleErrors, UserController.handlPostUser);
router.get('/:id', validateToken, handleErrors, UserController.handleGetUserById);
router.patch('/update/:id', validateToken, handleErrors, UserController.handleUpdateUserById);
router.delete('/delete/:id', validateToken, handleErrors, UserController.handleDeleteUserById);

module.exports = router;