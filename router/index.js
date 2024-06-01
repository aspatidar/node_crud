const express = require('express');
const router = express.Router();
const {UserController, EmployeeController} = require('../controller');
const UserRoute = require('./user.route');
const EmployeeRoute = require('./employee.route');
// User Routes
router.use('/user', UserRoute);

// Employee Routes 
router.use('/employee', EmployeeRoute);

module.exports = router;