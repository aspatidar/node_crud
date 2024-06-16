const express = require('express');
const router = express.Router();
const {EmployeeController} = require('../controller');
const {validateToken} = require('../middleware');

router.get('/employees', validateToken, EmployeeController.handleGetAllEmployee);
router.post('/create', validateToken, EmployeeController.handlePostEmployee);
router.get('/:id', validateToken, EmployeeController.handleGetEmployeeById);
router.patch('/update/:id', validateToken, EmployeeController.handleUpdateEmployeeById);
router.delete('/delete/:id', validateToken, EmployeeController.handleDeleteEmployeeById);

module.exports = router;