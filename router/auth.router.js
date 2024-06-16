const express = require("express");
const router = express.Router();
const { AuthController } = require("../controller");

router.post("/signup", AuthController.userSignup);
router.get("/signin", AuthController.userSignin);

module.exports = router;
