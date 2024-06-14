const express = require('express');
const router = express.Router();
const {UserController} = require('../controller');
const {validateToken} = require('../middleware');

router.get('/users', validateToken ,UserController.handlGetAllUser);
router.post('/create',validateToken, UserController.handlPostUser);
router.get('/:id', validateToken, UserController.handleGetUserById);
router.patch('/update/:id', validateToken, UserController.handleUpdateUserById);
router.delete('/delete/:id', validateToken, UserController.handleDeleteUserById);

module.exports = router;