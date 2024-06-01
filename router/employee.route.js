const express = require('express');
const router = express.Router();
const {EmployeeController} = require('../controller');

router.post('/', EmployeeController.handlPostEmployee);
router.get('/', EmployeeController.handleGetAllEmployee);
router.get('/:id', EmployeeController.handleGetEmployeeById);
router.patch('/update/:id', EmployeeController.handlUpdateEmployeeById);
router.delete('/delete/:id', EmployeeController.handlDeleteEmployeeById);

module.exports = router;