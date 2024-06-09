const express = require('express');
const router = express.Router();
const {EmployeeController} = require('../controller');

router.get('/employees', EmployeeController.handleGetAllEmployee);
router.post('/create', EmployeeController.handlPostEmployee);
router.get('/:id', EmployeeController.handleGetEmployeeById);
router.patch('/update/:id', EmployeeController.handlUpdateEmployeeById);
router.delete('/delete/:id', EmployeeController.handlDeleteEmployeeById);

module.exports = router;