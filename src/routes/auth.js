const express = require("express");
const router = express.Router();
const userController = require("../controllers");
const middleware = require("../helper/middleware");

router.post("/register", userController.user.registerUser);
module.exports = router;
