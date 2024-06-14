const express = require('express');
const router = express.Router();
const {EmployeeController} = require('../controller');
const {validateToken, handleErrors} = require('../middleware');

router.get('/employees', validateToken, handleErrors, EmployeeController.handleGetAllEmployee);
router.post('/create', validateToken, handleErrors, EmployeeController.handlPostEmployee);
router.get('/:id', validateToken, handleErrors, EmployeeController.handleGetEmployeeById);
router.patch('/update/:id', validateToken, handleErrors, EmployeeController.handlUpdateEmployeeById);
router.delete('/delete/:id', validateToken, handleErrors, EmployeeController.handlDeleteEmployeeById);

module.exports = router;