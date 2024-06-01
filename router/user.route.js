const express = require('express');
const router = express.Router();
const {UserController} = require('../controller');

router.post('/', UserController.handlPostUser);
router.get('/', UserController.handlGetAllUser);
router.get('/:id', UserController.handleGetUserById);
router.patch('/update/:id', UserController.handleUpdateUserById);
router.delete('/delete/:id', UserController.handleDeleteUserById);

module.exports = router;