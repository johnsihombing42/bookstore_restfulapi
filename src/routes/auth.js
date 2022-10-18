const express = require("express");
const router = express.Router();
const userController = require("../controllers");
const middleware = require("../helper/middleware");

router.post("/register", userController.user.register);
router.post("/login", userController.user.login);

module.exports = router;
