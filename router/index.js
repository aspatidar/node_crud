const express = require("express");
const router = express.Router();
const UserRoute = require("./user.route");
const EmployeeRoute = require("./employee.route");
const AuthRoutes = require("./auth.router");

// User Routes
router.use("/user", UserRoute);

// Employee Routes
router.use("/employee", EmployeeRoute);

// Auth Routes
router.use("/auth", AuthRoutes);

module.exports = router;
