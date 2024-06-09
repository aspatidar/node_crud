const express = require('express');
const router = express.Router();
const {UserController} = require('../controller');

router.get('/users', UserController.handlGetAllUser);
router.post('/create', UserController.handlPostUser);
router.get('/:id', UserController.handleGetUserById);
router.patch('/update/:id', UserController.handleUpdateUserById);
router.delete('/delete/:id', UserController.handleDeleteUserById);

module.exports = router;